'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imagesContainer = document.querySelector('.images');

let img;

const createImage = imgNum => {
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

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

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
  .catch(err => console.error(err.message));
