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
      handler(data);
    });
  }

  _generateFormMarkup() {
    return `<div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input placeholder="Title" value="" required name="title" type="text" />
      <label>URL</label>
      <input placeholder="Source URL" value="" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input placeholder="Image Link/Address" value="" required name="image" type="text" />
      <label>Publisher</label>
      <input placeholder="Publisher" value="" required name="publisher" type="text" />
      <label>Prep time</label>
      <input placeholder="Cooking Time" value="" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input placeholder="Servings" value="" required name="servings" type="number" />
    </div>
 
    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        value="0.5,kg,Rice"
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        value="1,,Avocado"
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        value=",,salt"
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>
 
    <button class="btn upload__btn">
      <svg>
        <use href="src/img/icons.svg#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>`;
  }
  // _generateMarkup() {}

  ///////////////////////////////////////////////
  // Alternative modal window handler
}

export default new AddRecipeView();
