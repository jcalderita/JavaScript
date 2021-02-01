'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page navigation
/* document.querySelectorAll('.nav__link').forEach((nav, key) => {
  nav.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
}); */

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const el = document.querySelector(e.target.getAttribute('href'));
  el && el.scrollIntoView({ behavior: 'smooth' });
  // document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });

  // const s1coords = section1.getBoundingClientRect();
  /*   console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log('Height/Width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); */

  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.y + window.pageYOffset);
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.y + window.pageYOffset,
    behavior: 'smooth',
  }); */
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const active = document.querySelector('.operations__tab--active');
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  if (clicked !== active) {
    e.preventDefault();
    active.classList.remove('operations__tab--active');
    clicked.classList.add('operations__tab--active');
    document.querySelector('.operations__content--active').classList.remove('operations__content--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  }
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
/* const initialCoordsTopSectio1 = section1.getBoundingClientRect().top;
window.addEventListener('scroll', () => (window.scrollY > initialCoordsTopSectio1 ? nav.classList.add('sticky') : nav.classList.remove('sticky'))); */

// Sticky navigation Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;
  !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navHeight}px` });
headerObserver.observe(header);

// Reveal sections
const sections = document.querySelectorAll('.section');
const revelarSections = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const observer = new IntersectionObserver(revelarSections, { threshold: 0.15 });
sections.forEach(section => observer.observe(section));

// const images = [...document.querySelectorAll('img')].filter(val => val.hasAttribute('data-src'));
const images = document.querySelectorAll('img[data-src]');
// const images = document.querySelectorAll('.lazy-img');
const changeImg = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.removeAttribute('data-src');
    // entry.target.classList.remove('lazy-img');
    entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
    observer.unobserve(entry.target);
    // console.log(entry.target);
  }
};

const observerImg = new IntersectionObserver(changeImg, { threshold: 0.15 });
images.forEach(img => observerImg.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
const createDots = () => slides.forEach((_, i) => dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`));
const desactivarDot = () => document.querySelector(`button[data-slide="${curSlide}"]`).classList.remove('dots__dot--active');
const activarDot = () => document.querySelector(`button[data-slide="${curSlide}"]`).classList.add('dots__dot--active');
dotContainer.addEventListener('click', function (e) {
  if (e.target.dataset.slide) {
    desactivarDot();
    curSlide = e.target.dataset.slide;
    goToSlide();
  }
});

createDots();

let curSlide = 0;

const goToSlide = () => {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`));
  activarDot();
};
goToSlide();

const prevSlide = () => {
  desactivarDot();
  curSlide === 0 ? (curSlide = slides.length - 1) : curSlide--;
  goToSlide();
};

const nextSlide = () => {
  desactivarDot();
  curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;
  goToSlide();
};

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', e => {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
// btnLeft.addEventListener('click', () => slides.forEach(s => (s.style.transform = `translateX(${Number(s.style.transform.translateX) - 100}%)`)));

/* const obsCallBack = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOpts = {
  root: null,
  threshold: [0, 0.1],
};

const observer = new IntersectionObserver(obsCallBack, obsOpts);
observer.observe(section1); */

// console.log(tabs);
// console.log(tabsContainer);
// console.log(tabsContent);
// Selecting, creating, deleting elements
// Seleccionar
/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const allSections = document.querySelectorAll('.section');
console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(document.getElementsByClassName('btn')); */
// Crear
/* const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove()); */
// Solo se crea una vez
// Principio
// header.prepend(message);
// Final
// header.append(message);
//Duplicar elemento
// header.append(message.cloneNode(true));

// Antes y después pero no dentro de header
/* header.before(message);
header.after(message); */

//Delete elementos
// document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

// Styles
/* message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 50 + 'px';
// Cambiar Estilos
document.documentElement.style.setProperty('--color-primary', 'orangered');
// Atributos
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.className);
console.log(logo.alt);

console.log(logo.getAttribute('src'));
logo.setAttribute('company', 'Bankist');

// Data atributos
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('abc', 'j');
logo.classList.remove('i');
console.log(logo.classList.toggle('abc'));

console.log(logo.classList.contains('abc')); */

// Eventos
/* const h1 = document.querySelector('h1');
const logH1 = e => {
  e.preventDefault();
  console.log('Entra');
  h1.removeEventListener('mouseenter', logH1);
};
h1.addEventListener('mouseenter', logH1); */

// Burbujeo
/* const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  // Parar la propagación
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    this.style.backgroundColor = randomColor();
  },
  true
); */

// Ver elementos superiores e inferiores
/* const h1 = document.querySelector('h1');
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

console.log(h1.parentNode);
console.log(h1.parentElement);

// Más cercano ascendente que cumpla las condiciones
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Seleccionando hermanos
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentNode.children);
[...h1.parentNode.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); */

// document.addEventListener('DOMContentLoaded', e => console.log('Html'));
// window.addEventListener('load', () => console.log('Cargado todo incluido los css'));
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
