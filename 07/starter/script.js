'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer;
const scores = [0, 0];
let currentEl;

const tirarDado = () => Math.trunc(Math.random() * 6 + 1);

const limpiar = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentEl = document.getElementById(`current--${activePlayer}`);
};

const cambiarPlayer = function () {
  currentEl.textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = Number(!activePlayer);
  currentScore = 0;
  currentEl = document.getElementById(`current--${activePlayer}`);
};

btnRoll.addEventListener('click', function () {
  const dado = tirarDado();
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dado}.png`;

  if (dado !== 1) {
    currentScore += dado;
    currentEl.textContent = currentScore;
  } else {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;
    cambiarPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  cambiarPlayer();
});

btnNew.addEventListener('click', limpiar);

limpiar();