'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const visible = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const ocultar = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

overlay.addEventListener('click', ocultar);
btnCloseModal.addEventListener('click', ocultar);
for (let i = 0; i < btnOpenModal.length; i++) btnOpenModal[i].addEventListener('click', visible);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) ocultar();
});
