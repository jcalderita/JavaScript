'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const getJSONCountry = (country, errorMsg = 'Something went wront') => {
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response => {
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
// getCountryData('australia');

// getCountryData('portugal');

/* const getCountryData = country => {
  countriesContainer.innerHTML = '';
  fetch('https://restcountries.eu/rest/v2/name/'.concat(country))
    .then(response => {
      if (!response.ok) throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderContry(data[0]);
      const vecino = data[0].borders[0];
      if (!vecino) return;
      return fetch(`https://restcountries.eu/rest/v2/alpha/${vecino}`);
    })
    .then(response => response.json())
    .then(data => renderContry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}; */
// Antigua

/* const getCountryData = country => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      const html = `
      <article class="country">
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
  
      //   countriesContainer.innerHTML = html;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  }; */

/*
  const getCountryAndNeighbour = country => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      renderContry(data);
  
      const [neighbour] = data.borders;
      if (!neighbour) return;
  
      console.log(neighbour);
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      request2.send();
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(this.responseText);
        renderContry(data2, 'neighbour');
      });
    });
  };
  
  getCountryAndNeighbour('usa'); */

/* console.log('Test Start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolve promise 1').then(res => console.log(res));
Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 1; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test End'); */

/* const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Compra de lotería');
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve('You WIN');
    else reject(new Error('You LOST'));
  }, 2000);
});

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

wait(2).then(() => {
  console.log('Acabo la espera');
  return wait(1);
}); */

/* const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position.coords),
    //   err => reject(new Error(err))
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition()
//   .then(pos => console.log(pos.coords.latitude))
//   .catch(err => console.error(err));

const whereIAm = () => {
  getPosition()
    .then(pos => {
      return fetch(`https://geocode.xyz/${pos.coords.latitude},${pos.coords.longitude}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error('Problem with geocoding');
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Contry not found ${res.status}`);
      return res.json();
    })
    .then(data => renderContry(data[0]))
    .catch(err => console.error(err.message))
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereIAm(); */

/* const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereIAm = async () => {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const latlng = await (await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)).json();
    const data = await (await fetch(`https://restcountries.eu/rest/v2/name/${latlng.country}`)).json();
    renderContry(data[0]);
    countriesContainer.style.opacity = 1;
    return `You are in ${latlng.city}, ${latlng.country}`;
  } catch (err) {
    throw err;
  }
};

console.log('Uno');
/* whereIAm()
  .then(res => console.log(res))
  .catch(err => console.error(err.message));
console.log('Tres'); 

(async () => {
  try {
    const res = await whereIAm();
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
  console.log('Tres');
})(); */

/* const get3Countries = async (c1, c2, c3) => {
  try {
    const data = await Promise.all([getJSON(`https://restcountries.eu/rest/v2/name/${c1}`), getJSON(`https://restcountries.eu/rest/v2/name/${c2}`), getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania'); */

// Promise.race

/* (async () => {
  const res = await Promise.race([getJSONCountry('italy'), getJSONCountry('egypt'), getJSONCountry('mexico')]);
  console.log(res[0]);
})(); */

/* const timeout = sec => new Promise((_, reject) => setTimeout(() => reject(new Error('Tiempo caducado')), sec * 1000));

Promise.race([getJSONCountry('tanzania'), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err.message)); */

// Promise.allSettled
/* (async () => {
  const res = await Promise.allSettled([getJSONCountry('italy'), getJSONCountry('aaa'), getJSONCountry('mexico')]);
  console.log(res);
})(); */

// Promise.any
(async () => {
  const res = await Promise.any([getJSONCountry('italy'), getJSONCountry('aaa'), getJSONCountry('mexico')]);
  console.log(res[0]);
})();
