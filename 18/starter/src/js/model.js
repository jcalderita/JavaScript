import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = data => {
  return [data.recipe].map(val => {
    const { id, title, publisher, source_url, image_url, servings, cooking_time, ingredients, key } = val;
    return { id, title, publisher, sourceUrl: source_url, image: image_url, servings, cookingTime: cooking_time, ingredients, ...(key && { key }) };
  });
};

export const loadRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
    const [recipe] = createRecipeObject(data);
    state.recipe = recipe;
    state.recipe.bookmarked = state.bookmarks.some(val => val.id === state.recipe.id);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.recipes.map(val => {
      const { id, title, publisher, image_url, key } = val;
      return { id, title, publisher, image: image_url, ...(key && { key }) };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = Number(page);
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = () => {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};

export const updateServings = newServings => {
  try {
    state.recipe.ingredients.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = Number(newServings);
  } catch (err) {
    throw err;
  }
};

export const bookmark = recipe => {
  const index = state.bookmarks.findIndex(val => val.id === recipe.id);
  if (index === -1) {
    state.bookmarks.push(recipe);
    state.recipe.bookmarked = true;
  } else {
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};

const clearBookmarks = () => localStorage.removeItem('bookmarks');

export const uploadRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(val => val.trim());
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format.');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    const [datarecipe] = createRecipeObject(data);
    state.recipe = datarecipe;
    bookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

init();
