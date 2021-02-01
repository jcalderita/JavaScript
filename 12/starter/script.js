'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
let temporizador;

const starLogOutTimer = () => {
  if (temporizador) clearInterval(temporizador);
  let timer = 300000;
  const options = {
    minute: '2-digit',
    second: '2-digit',
  };

  const tikc = () => {
    labelTimer.textContent = new Intl.DateTimeFormat(navigator.language, options).format(new Date(timer));
    if (timer === 0) {
      clearInterval(temporizador);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    timer -= 1000;
  };

  tikc();
  temporizador = setInterval(tikc, 1000);
};

const formatCurrency = (acc, money) => new Intl.NumberFormat(acc.locale, { style: 'currency', currency: acc.currency }).format(money);

const formatMovementDate = (date, locale) => {
  const calcDays = Math.round((new Date() - date) / (1000 * 60 * 60 * 24));

  if (calcDays === 0) return 'Today';
  if (calcDays === 1) return 'Yesterday';
  if (calcDays <= 7) return `${calcDays} days ago`;
  // return `${String(date.getDate()).padStart(2, 0)}/${String(date.getMonth() + 1).padStart(2, 0)}/${date.getFullYear()}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${formatMovementDate(new Date(acc.movementsDates[i]), acc.locale)}</div>
        <div class="movements__value">${formatCurrency(acc, mov.toFixed(2))}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(acc, acc.balance.toFixed(2));
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCurrency(acc, incomes.toFixed(2));

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;
  labelSumOut.textContent = formatCurrency(acc, Math.abs(out.toFixed(2)));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCurrency(acc, interest.toFixed(2));
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

  //Activar contador
  starLogOutTimer();
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// Fake always logged in
/* currentAccount = account1;
containerApp.style.opacity = 100;
updateUI(currentAccount); */

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Date
    const now = new Date();
    // labelDate.textContent = `${String(now.getDate()).padStart(2, 0)}/${String(now.getMonth() + 1).padStart(2, 0)}/${now.getFullYear()}, ${String(now.getHours()).padStart(2, 0)}:${String(now.getMinutes()).padStart(2, 0)}`;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  setTimeout(() => {
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
      // Add movement
      currentAccount.movements.push(amount);

      // Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }
  }, 2500);
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/* console.log(Number.parseInt('30px', 10));
console.log(Number.parseFloat('2.5rem', 10));
console.log(Number.parseInt('2.5rem', 10));
// No es número
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Mejor para saber si es un número
console.log(Number.isFinite(23 / 0)); */

// Operaciones matemáticas
// Raíz cuadrada
/* console.log(Math.sqrt(50));
console.log(Math.max(5, 3, 43, 5, 6));
console.log(Math.min(5, 3, 43, 5, 6));
console.log(Math.PI);
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomInt(3, 4));

// Redondeo hacia arriba
console.log(Math.ceil(23.1));
// Redondeo hacia abajo
console.log(Math.floor(23.9)); */

// Operador de resto
// console.log(5 % 2);

// BigInt
// console.log(23838758473875843785734875837853849583758738475893n);

// Fechas
/* const now = new Date();
console.log(now);
console.log(new Date('Jan 05 2021 12:06:26'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 25, 16, 45, 10));
console.log(new Date(0)); */

/* const future = new Date(2037, 10, 25, 16, 45, 10);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.toDateString());
console.log(future.getTime());
console.log(Date.now()); */

// Operaciones con fechas
/* const future = new Date(2037, 10, 25, 16, 45, 10);
/* console.log(+future);
console.log(future.getTime());

const calcDays = (max, min) => (max - min) / (1000 * 60 * 60 * 24);
console.log(calcDays(future, new Date())); */

// Internacinalizar Fechas
/* const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
console.log(new Intl.DateTimeFormat('en-GB', options).format(now));
labelDate.textContent = new Intl.DateTimeFormat('es-ES', options).format(now);
console.log(navigator.language);
console.log(new Intl.DateTimeFormat(navigator.language, options).format(now)); */

// Internacinalizar Fechas
/* const num = 41654654.23;
console.log('US: ', new Intl.NumberFormat('en-US').format(num));
console.log('ES: ', new Intl.NumberFormat('es-ES').format(num));
console.log('PT: ', new Intl.NumberFormat('pt-PT').format(num));
const options = {
  style: 'currency',
  unit: 'mile-per-hour',
  currency: 'EUR',
  useGrouping: false,
};

console.log(navigator.language, new Intl.NumberFormat(navigator.language, options).format(num)); */

// Temporizadores
/* const ingredientes = ['olivas', 'Guisantes'];
const contador = setTimeout(
  (ing1, ing2) => {
    console.log(`Aquí está su pizza. ${ing1}, ${ing2}`);
  },
  10000,
  ...ingredientes
);

if (ingredientes.includes('Guisantes')) clearTimeout(contador); */

// setInterval
/* const options = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

setInterval(() => {
  // console.log(new Date());
  console.log(new Intl.DateTimeFormat(navigator.language, options).format(new Date()));
}, 1000); */
