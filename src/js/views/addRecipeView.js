import { MAX_INGREDIENTS } from "../config.js";
import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _uploadBtn = document.querySelector(".upload__btn");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelectorAll(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was successfully uploaded ;)";
  _btnOpenfromSideBar = document.querySelector(".sidebar");
  _btnAdd = document.querySelector(".add__ingredient");
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this.addHandlerAddIngredient();
    // this.addHandlerWindowToggler();
  }

  // addHandlerWindowToggler() {
  //   [this._btnOpen, this._btnClose, this._overlay].forEach(btn =>
  //     btn.addEventListener("click", () => {
  //       this._overlay.classList.toggle("hidden");
  //       this._window.classList.toggle("hidden");
  //     })
  //   );
  // }

  toggleWindow() {
    if (
      Array.from(this._parentElement.childNodes).length < 7 ||
      (Array.from(this._btnOpenfromSideBar.childNodes).length < 3 &&
        Array.from(this._overlay.classList).includes("hidden"))
    ) {
      this._parentElement.innerHTML = this._generateFormMarkup();
    }
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
    this._textSide();
  }

  _addHandlerShowWindow() {
    this._btnOpen.forEach(btn =>
      btn.addEventListener("click", this.toggleWindow.bind(this))
    );

    console.log(this._parentElement.childNodes);
    // console.log(this._btnOpenfromSideBar.childNodes);
  }

  _textSide() {
    this._btnOpenfromSideBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".sidebar__list");
      console.log(btn);
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addMoreIngredient() {
    const ingCount = Array.from(
      this._parentElement.querySelectorAll(".ingredients")
    ).length;
    if (ingCount + 1 === MAX_INGREDIENTS) this._btnAdd.classList.add("hidden");

    return `
      <label>Ingredient ${ingCount + 1}</label>
          <div class="ingredients">
            <input
              class="field"
              value=""
              type="number"
              pattern="[0-9]*"
              min="0"
              required
              name="ingredient-${ingCount + 1}_quantity"
              placeholder="Quantity"
            />
            <select
              name="ingredient-${ingCount + 1}_unit"
              id="ingredient-${ingCount + 1}_unit"
              title="Ingredient ${ingCount + 1} Unit"
            >
              <option selected disabled hidden>Unit</option>
              <option value="gram">Gram</option>
              <option value="milligram">Milligram</option>
              <option value="kilogram">Kilogram</option>
              <option value="ounce">Ounce</option>
              <option value="pound">Pound</option>
              <option value="litre">Litre</option>
              <option value="millilitre">Millilitre</option>
            </select>
            <input
              class="field"
              type="text"
              pattern="[A-Za-z ]+"
              required
              name="ingredient-${ingCount + 1}_description"
              placeholder="Description"
            />
          </div>
            `;
  }

  addHandlerAddIngredient() {
    this._btnAdd.addEventListener(
      "click",
      function () {
        this._btnAdd.insertAdjacentHTML(
          "beforebegin",
          this._addMoreIngredient()
        );
      }.bind(this)
    );
  }

  _generateFormMarkup() {
    return `
    <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input
    placeholder="Title"
    value=""
    required
    name="title"
    type="text"
    />
    <label>URL</label>
    <input
    placeholder="Source URL"
    value=""
    required
    name="sourceUrl"
    type="text"
    />
    <label>Image URL</label>
    <input
    placeholder="Image Link/Address"
    value=""
    required
    name="image"
    type="text"
    />
    <label>Publisher</label>
    <input
    placeholder="Publisher"
    value=""
    required
    name="publisher"
    type="text"
    />
    <label>Prep time</label>
    <input
    placeholder="Cooking Time"
    value=""
    required
    name="cookingTime"
    type="number"
    />
    <label>Servings</label>
    <input
    placeholder="Servings"
    value=""
    required
    name="servings"
    type="number"
    />
    </div>
    
    <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
  <div>
  <input
  value=""
  type="number"
  pattern="[0-9]*"
      min="0"
      required
      name="ingredient-1_quantity"
      placeholder="Quantity"
      />
      
      <select
      name="ingredient-1_unit"
      id="ingredient-1_unit"
      title="Ingredient 1 Unit"
      >
      <option selected disabled hidden>Unit</option>
      <option value="gram">Gram</option>
      <option value="milligram">Milligram</option>
      <option value="kilogram">Kilogram</option>
      <option value="ounce">Ounce</option>
      <option value="pound">Pound</option>
      <option value="litre">Litre</option>
      <option value="millilitre">Millilitre</option>
      </select>
      <input
      type="text"
      pattern="[A-Za-z ]+"
      required
      name="ingredient-1_description"
      placeholder="Description"
      />
      </div>
      <label>Ingredient 2</label>
      <div>
      <input
      value=""
      type="number"
      pattern="[0-9]*"
      min="0"
      required
      name="ingredient-2_quantity"
      placeholder="Quantity"
    />
    <select
    name="ingredient-2_unit"
    id="ingredient-2_unit"
    title="Ingredient 2 Unit"
    >
    <option selected disabled hidden>Unit</option>
    <option value="gram">Gram</option>
      <option value="milligram">Milligram</option>
      <option value="kilogram">Kilogram</option>
      <option value="ounce">Ounce</option>
      <option value="pound">Pound</option>
      <option value="litre">Litre</option>
      <option value="millilitre">Millilitre</option>
      </select>
      <input
      type="text"
      pattern="[A-Za-z ]+"
      required
      name="ingredient-2_description"
      placeholder="Description"
      />
      </div>
      <label>Ingredient 3</label>
      <div>
      <input
      value=""
      type="number"
      pattern="[0-9]*"
      min="0"
      required
      name="ingredient-3_quantity"
      placeholder="Quantity"
      />
      <select
      name="ingredient-3_unit"
      id="ingredient-3_unit"
      title="Ingredient 3 Unit"
      >
      <option selected disabled hidden>Unit</option>
      <option value="gram">Gram</option>
      <option value="milligram">Milligram</option>
      <option value="kilogram">Kilogram</option>
      <option value="ounce">Ounce</option>
      <option value="pound">Pound</option>
      <option value="litre">Litre</option>
      <option value="millilitre">Millilitre</option>
      </select>
      <input
      type="text"
      pattern="[A-Za-z ]+"
      required
      name="ingredient-3_description"
      placeholder="Description"
      />
      </div>
      </div>
      
      <button class="btn upload__btn">
      <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
      </button>`;
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //Because we are inside of a handler function, this points to this._parentElement,which is of course the upload form.
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }
  /////////////////////////////////////////
  // Alternative modal window handler
}

export default new AddRecipeView();
