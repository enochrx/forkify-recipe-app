import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { DEFAULT_PAGE, MODAL_CLOSE_TIMER_SEC } from "./config.js";

import "core-js/actual";

// import "regenerator-runtime/runtime.js";

//hot module reloading is to prevent complete page reload rather than just update the page it is not a real JS code but it is coming from parcel
// if (module.hot) {
//   module.hot.accept();
// }

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //Loading recipe
    await model.loadRecipe(id); //an async function from model.js being called by another async function in the controller, and it will return a promise, so we have to await it but it's not returning anything so no need to store it in a new variable, instead we'll have access to state.recipe

    //Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //Get query from view
    const query = searchView.getQuery();
    if (!query) return;

    //Load search from model
    await model.loadSearchResults(query);

    //Render result -- default page is 1 otherwise no argument passed === bugs for next search
    resultsView.render(model.getSearchResultsPage(DEFAULT_PAGE));

    //Render initial pagination
    paginationView.render(model.state.search);
    console.log(model.state.search.results.length);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //Render NEW result
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe servings (in the state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddRemoveBookmark = function () {
  //Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //Update recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Add loading spinner
    addRecipeView.renderSpinner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIMER_SEC * 1000);
  } catch (err) {
    // console.error(err);
    addRecipeView.renderError(err.message);
  }
  // setTimeout(function () {
  //   location.reload();
  // }, 60500);
};

//Handling events propagated from recipe view using Publisher-subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddRemoveBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // clearBookmarksStorage();
};
init(); //We can also use IIFE here
