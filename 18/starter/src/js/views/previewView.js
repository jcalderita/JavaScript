import View from './View.js';

import icons from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(val) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${val.id === id ? 'preview__link--active' : ''}" href="#${val.id}">
        <figure class="preview__fig">
          <img src="${val.image}" alt="${val.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${val.title}</h4>
          <p class="preview__publisher">${val.publisher}</p>
        </div>
        <div class="preview__user-generated ${val.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>        
      </a>
    </li>
  `;
  }
}
