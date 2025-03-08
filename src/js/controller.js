import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/actual";
// import "regenerator-runtime/runtime.js";

// console.log(icons);

const recipeContainer = document.querySelector(".recipe");

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
    const { recipe } = model.state;

    //Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    // alert(err);
  }
};

//Handling events propagated from recipe view using Publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init(); //We can also use IIFE here
