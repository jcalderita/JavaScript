'use strict';

let numeroSecreto;
let puntuacion;
let puntuacionMax = 0;
// console.log(numeroSecreto);

const limpiar = function () {
  numeroSecreto = Math.trunc(Math.random() * 20) + 1;
  puntuacion = 20;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = puntuacion;
};

document.querySelector('.again').addEventListener('click', limpiar);

document.querySelector('.check').addEventListener('click', function () {
  const numero = Number(document.querySelector('.guess').value);
  const mensaje = document.querySelector('.message');
  const score = document.querySelector('.score');

  if (puntuacion > 0) {
    if (!numero) {
      mensaje.textContent = '⛔ No number!';
    } else if (numero === numeroSecreto) {
      mensaje.textContent = '🎉 Correct number!';
      puntuacionMax = puntuacion > puntuacionMax ? puntuacion : puntuacionMax;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').textContent = numeroSecreto;
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.highscore').textContent = puntuacionMax;
    } else if (numero !== numeroSecreto) {
      mensaje.textContent = numero > numeroSecreto ? '📈 Too high!' : '📉 Too lower!';
      puntuacion--;
    }
    score.textContent = puntuacion;
  }

  if (puntuacion === 0) {
    mensaje.textContent = '💥 You lost the game!';
  }
});

limpiar();
