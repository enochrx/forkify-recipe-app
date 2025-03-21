// import { async } from "regenerator-runtime";
import { API_URL, RESULT_PER_PAGE, DEFAULT_PAGE, API_KEY } from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: DEFAULT_PAGE,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

const recipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);

    state.recipe = recipeObject(data);
    // console.log(state.recipe);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //Temp error handling
    // console.error(`${err} 💥💥💥💥`);
    // alert(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    //Alternative way to reset page to 1 after each search
    // state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  console.log(page);
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    //newQty = oldQty * newServings / oldServing
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  //Users can disable localStorage under browser settings, so the localStorage object is null, thus it's a good practice to wrap localStorage usage in a try catch block
  try {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  } catch (err) {
    throw err;
  }
};

export const addBookmark = function (recipe) {
  //Add bookmarked recipe to state
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  //Delete bookmark
  const index = state.bookmarks.findIndex(element => element.id === id);
  state.bookmarks.splice(index, 1);

  //Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const loadBookmarks = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

loadBookmarks();

export const clearBookmarksStorage = function () {
  localStorage.clear("bookmarks");
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(ing => {
        const ingArr = ing[1].split(",").map(el => el.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = recipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
