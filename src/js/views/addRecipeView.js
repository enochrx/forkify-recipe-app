import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    // this._addHandlerShowWindow();
    // this._addHandlerHideWindow();
    this._addHandlerWindowToggler();
  }

  _addHandlerWindowToggler() {
    [this._btnOpen, this._btnClose, this._overlay].forEach(btn =>
      btn.addEventListener("click", () => {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
      })
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //Because we are inside of a handler function, this points to this._parentElement,which is of course the upload form.
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // _generateMarkup() {}

  /////////////////////////////////////////////////
  //Alternative modal window handler
  //   _toggleWindow() {
  //     this._overlay.classList.toggle("hidden");
  //     this._window.classList.toggle("hidden");
  //   }

  //   _addHandlerShowWindow() {
  //     this._btnOpen.addEventListener("click", this._toggleWindow.bind(this));
  //   }

  //   _addHandlerHideWindow() {
  //     this._btnClose.addEventListener("click", this._toggleWindow.bind(this));
  //     this._overlay.addEventListener("click", this._toggleWindow.bind(this));
  //   }
}

export default new AddRecipeView();
