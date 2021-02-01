import View from './View.js';

import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      handler(btn.dataset.page);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const curPages = this._data.page;
    if (curPages === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-page="${curPages + 1}">
            <span>Page ${curPages + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    if (curPages === 1 && numPages === 1) {
      return '';
    }

    if (numPages === curPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-page="${curPages - 1}">
            <span>Page ${curPages - 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>`;
    }

    return `
        <button class="btn--inline pagination__btn--prev" data-page="${curPages - 1}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPages - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-page="${curPages + 1}">
            <span>Page ${curPages + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
