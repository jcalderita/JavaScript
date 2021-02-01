'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const whereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok && response.status === 403) throw new Error('Demasiadas peticiones por sg.');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
      // renderContry(data);
    })
    .catch(err => console.error(err.message));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

const renderContry = (data, className = '') => {
  const html = `
<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.nativeName}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
</article>    
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = (url, errorMsg = 'Something went wront') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = country => {
  countriesContainer.innerHTML = '';
  getJSON('https://restcountries.eu/rest/v2/name/'.concat(country))
    .then(data => {
      renderContry(data[0]);
      const vecino = data[0].borders[0];
      if (!vecino) throw new Error('No neighbour found!');
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${vecino}`, 'Country not found');
    })
    .then(data => renderContry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// btn.addEventListener('click', () => getCountryData('portugal'));
