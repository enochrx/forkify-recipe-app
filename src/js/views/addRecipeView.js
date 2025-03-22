import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _uploadBtn = document.querySelector(".upload__btn");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was successfully uploaded ;)";
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
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
      Array.from(this._parentElement.childNodes).length < 7 &&
      Array.from(this._overlay.classList).includes("hidden")
    ) {
      this._parentElement.innerHTML = this._generateFormMarkup();
    }
    // const formMarkup = this._generateFormMarkup();
    // this._parentElement.innerHTML = formMarkup;
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
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
      pattern="[A-Za-z]*"
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
      pattern="[A-Za-z]*"
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
      pattern="[A-Za-z]*"
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

  ///////////////////////////////////////////////
  // Alternative modal window handler
}

export default new AddRecipeView();
