import View from "./View.js";
import icons from "url:../../img/icons.svg";

let currentPage;

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", e => {
      //Event delegation
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      //Using data attribute
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  totalPageNumber() {
    return `
      <div class="pagination--page__display  page__display">
      <span>${this._data.page} / ${Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )}</span>
        </div>`;
  }

  _generateMarkup() {
    currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    this.totalPageNumber();
    // const totalPage = this._data.results.length;

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this.totalPageNumber() + nextButton();
    }
    //page 1. and there are NO other pages
    if (currentPage === 1 && numPages === 1) {
      return "" + this.totalPageNumber();
    }

    //Last page
    if (currentPage === numPages && numPages > 1) {
      return prevButton() + this.totalPageNumber();
    }
    //Other page
    if (currentPage < numPages) {
      return `${prevButton() + this.totalPageNumber()} 
     ${nextButton()}`;
    }
  }
}

const prevButton = () => `
<button data-goto="${
  currentPage - 1
}" class="btn--inline page__display pagination__btn--prev">
<svg class="search__icon">
<use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${currentPage - 1}</span>
</button>`;

const nextButton = () => `
<button  data-goto="${
  currentPage + 1
}" class="btn--inline page__display pagination__btn--next">
<span>Page ${currentPage + 1}</span>
<svg class="search__icon">
<use href="${icons}#icon-arrow-right"></use>
</svg>
</button>`;

export default new PaginationView();
