import View from "./View";
import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class ShoppingListView extends View {
  _parentElement = document.querySelector(".shop__list");
  _shopButton = document.querySelector(".shop__btn");
  _shopCountContainer = document.querySelector(".shop__count");
  _message = "Create your shopping cart here...";
  _errorMessage = "No valid recipe added";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  //Markup for Shopping list View
  _generateMarkup() {
    return this._generateMarkupShopList() + this._generateMarkupButtons();
  }
  // Display for how much ingredients are in SHOPPING list.
  _shopCount(count = 0) {
    this._shopCountContainer.textContent = count;
  }
  _generateMarkupShopList() {
    let html = this._data.reduce((acc, curr) => {
      if (!curr.description.includes(":")) {
        acc += `
          <li>
            <p><span class="remove__ingredient">&#10005;</span><span>${
              curr.quantity ? fracty(curr.quantity) : ""
            } ${curr.unit}</span> ${curr.description}</p>
            <hr />
            </li>`;
      } else acc += "";

      return acc;
    }, "");
    this._shopCount(this._data.length);
    return html;
  }

  // HTML for buttons on SHOPPING list view
  _generateMarkupButtons() {
    return `
        <div class="shop__btn">
            <button class="btn--small recipe__btn shop__btn__clear">
            <span>&#10005;</span>
            <span>Clear list</span>
            </button>
            <button class="btn--small recipe__btn buy--now">
            <svg class="search__icon">
                <use href="${icons}#icon-buy"></use>
            </svg>
            <span>Buy Now</span>
            </button>
        </div>`;
  }

  addHandlerClearList(handler) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".shop__btn__clear");
        if (!btn) return;

        this._shopCount();
        handler();
      }.bind(this)
    );
  }
}

export default new ShoppingListView();
