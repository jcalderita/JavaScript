class SearchView {
  #parentEl = document.querySelector('.search');
  #btn = document.querySelector('.search__icon');
  #field = document.querySelector('.search__field');

  getQuery() {
    const query = this.#field.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#field.value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
