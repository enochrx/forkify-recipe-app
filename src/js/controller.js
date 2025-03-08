import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

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

    //Render result
    resultsView.render(model.getSearchResultsPage());
  } catch {
    console.error(err);
  }
};

//Handling events propagated from recipe view using Publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init(); //We can also use IIFE here
