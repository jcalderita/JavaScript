'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imagesContainer = document.querySelector('.images');

let img;

/* const createImage = imgNum => {
  return new Promise((resolve, reject) => {
    img = document.createElement('img');
    img.src = `img/img-${imgNum}.jpg`;

    img.addEventListener('load', () => {
      imagesContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => reject(new Error('Carga incorrecta.')));
  });
};


createImage(1)
.then(() => wait(2))
.then(() => {
  img.style.display = 'none';
  return createImage(2);
})
.then(() => {
  return wait(2);
})
.then(() => (img.style.display = 'none'))
.catch(err => console.error(err.message)); */

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const createImage = async imgNum => {
  try {
    img = document.createElement('img');
    img.src = `img/img-${imgNum}.jpg`;

    img.addEventListener('load', () => {
      imagesContainer.append(img);
    });

    img.addEventListener('error', () => new Error('Carga incorrecta.'));

    await wait(2);
    img.style.display = 'none';
    await wait(2);
    return true;
  } catch (err) {
    throw err;
  }
};

(async () => {
  try {
    for (let i = 1; i < 4; i++) {
      const res = await createImage(i);
      if (!res) break;
    }
  } catch (err) {
    console.error(err.message);
  }
})();
