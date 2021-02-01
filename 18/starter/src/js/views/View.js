import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _markup;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    this._markup = this._generateMarkup();
    this._clear();
    this._renderHTML();
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') curEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _renderHTML() {
    this._parentElement.insertAdjacentHTML('afterbegin', this._markup);
    // this._markup = '';
  }

  renderSpinner = () => {
    this._markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>  
      `;
    this._clear();
    this._renderHTML();
  };

  renderError(message = this._errorMessage) {
    this._markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._renderHTML();
  }

  renderMessage(message = this._message) {
    this._markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._renderHTML();
  }
}
