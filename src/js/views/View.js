import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._adjHTML(markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _adjHTML(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const spinnerMarkup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> `;
    this._clear();
    this._adjHTML(spinnerMarkup);
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._adjHTML(errorMarkup);
  }

  renderMessage(message = this._message) {
    const errorMarkup = `
        <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._adjHTML(errorMarkup);
  }
}
