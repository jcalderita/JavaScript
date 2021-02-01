'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const pintarMovimientos = (movimientos, sort = false) => {
  containerMovements.innerHTML = '';
  const movs = sort ? movimientos.slice().sort((a, b) => a > b) : movimientos;
  movs.forEach((e, i) => {
    const tipo = e > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${tipo}">${i + 1} ${tipo}</div>
    <div class="movements__value">${e}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// pintarMovimientos(account1.movements);

const pintarBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// pintarBalance(account1.movements);

const pintarSummary = cuenta => {
  labelSumIn.textContent = `${cuenta.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)} €`;
  labelSumOut.textContent = `${Math.abs(cuenta.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0))} €`;
  labelSumInterest.textContent = `${cuenta.movements.filter(mov => mov > 0).reduce((acc, mov) => ((mov * cuenta.interestRate) / 100 >= 1 ? acc + (mov * cuenta.interestRate) / 100 : acc), 0)} €`;
};

const updateUI = acc => {
  pintarMovimientos(acc.movements);
  pintarBalance(acc);
  pintarSummary(acc);
};

// pintarSummary(account1.movements);

const createUserNames = accounts =>
  accounts.forEach(
    e =>
      (e.userName = e.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );

createUserNames(accounts);

// Eventos
let currentAccount;
// Login
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value));
  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  }
});
// Transferencia
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amout = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value.toLowerCase());
  inputTransferAmount.value = inputTransferTo.value = '';
  if (receiverAcc && amout >= 0 && currentAccount.balance > amout && receiverAcc?.userName !== currentAccount.userName) {
    receiverAcc.movements.push(amout);
    currentAccount.movements.push(-amout);
    updateUI(currentAccount);
  }
});
// Prestamo
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
// Cerrar cuenta
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (inputCloseUsername.value.toLowerCase() === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
    const indexAccount = accounts.findIndex(acc => acc.userName === currentAccount.userName);
    indexAccount > -1 && accounts.splice(indexAccount, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let ordenado = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  ordenado = !ordenado;
  pintarMovimientos(currentAccount.movements, ordenado);
});

// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; */

/////////////////////////////////////////////////
// Herramientas arrays
/* let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE Copiar
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
// Copiar
console.log(arr.slice());
console.log([...arr]);

// SPLICE Extraer del array original
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE ivertir y muta el array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT Concatenar
const letters = arr.concat(arr2);
console.log(letters);

// JOIN Unir
console.log(letters.join(' - ')); */

// ForEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Se puede cerrar el bucle
/* for (const movement of movements) {
   for (const [i, movement] of movements.entries()) {  
  if (movement > 0) console.log(`Depositaste ${movement}`);
  else console.log(`Retiraste ${Math.abs(movement)}`);
} */

// No se puede romper el bucle
/* movements.forEach((element, index, array) => {
  if (element > 0) console.log(`Movimiento ${index + 1} Depositaste ${element}`);
  else console.log(`Movimiento ${index + 1} Retiraste ${Math.abs(element)}`);
});

// Mapas y grupos
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Map
currencies.forEach((element, key, map) => {
  console.log(`${key}: ${element}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(element => {
  console.log(`${element}`);
}); */

// Bankist App

// The map method array
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * eurToUsd);

console.log(movementsUsd);

const movementsStr = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);
movementsStr.forEach(e => console.log(e)); */

// The filter method
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0); */

// The method Reduce
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, mov) => acc + mov);
console.log(balance);
// Valor máximo
const movimientoMax = movements.reduce((acc, mov) => (mov > acc ? mov : acc));
console.log(movimientoMax); */

// Hacer todos los metodos a la vez
/* const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsUSD = movements
  .filter(mov => mov >= 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD); */

// Find Method Primer elemento
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.find(mov => mov < 0));
console.log(accounts.find(acc => acc.owner === 'Jessica Davis')); */

// FindIndex Method
// Some and Every(todos los elementos de la función)
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 0));

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));
// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit)); */

// Flat and FlatMap
/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDep.flat(2));

console.log(
  accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0)
);

console.log(accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)); */

// Sorting arrays
/* const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort((a, b) => a > b)); */

// Rellenar arrays
// const x = new Array(7);
/* x.fill(1, 3); 
console.log(x);*/

/* const rellenar = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(rellenar); */

/* labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);
}); */
