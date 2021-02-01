'use strict';

/* // Valores vs Referencias
const vuelo = 'LH234';
const jorge = { nombre: 'Jorge', pasaporte: 25187542 };

const checkIn = (numVuelo, pasajero) => {
  numVuelo = 'LH999';
  pasajero.nombre = 'Mr. ' + pasajero.nombre;
  console.log(pasajero.pasaporte === 25187542 ? 'Check In' : 'Pasaporte incorrecto');
}; */

/* checkIn(vuelo, jorge);
console.log(vuelo, jorge); */

/* const reservas = [];

// Parametros por defecto
const crearReserva = (numVuelo, numPasajeros = 1, precio = 199 * numPasajeros) => {
  const reserva = { numVuelo, numPasajeros, precio };
  
  reservas.push(reserva);
};

crearReserva(1, 3, 35);
crearReserva('LH123');
crearReserva('LH123', 3);
crearReserva('LH123', undefined, 3);

console.log(reservas); */

// Funciones orden superior
/* const oneWord = str => {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
const transformer = (str, fn) => {
  console.log(`Transformed string: ${fn(str)}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord); */

// Devolver una funcion dentro de otra
/* const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jorge');
greeterHey('Steven');

greet('Hello')('Jonas'); */

// This en funciones
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
}; */

/* lufthansa.book(239, 'Jorge Calderita');
lufthansa.book(635, 'John Smith');

console.log(lufthansa); */

/* const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  // book: lufthansa.book,
}; */

// const book = lufthansa.book;
// No funciona porque ahora apunta a indefinido
// book(23, 'Sarah Willians');
// Con call pasandole como primer parámetro el objeto funciona
/* book.call(euroWings, 123, 'Ana Rodriguez');
console.log(euroWings);

euroWings.book(123, 'Ana Rodriguez');
euroWings.book(543, 'Alberto Martín'); */

// Aplicar métodos
/* const flightData = [584, 'George Cloney'];
book.apply(euroWings, flightData);
book.call(euroWings, ...flightData); */

// Metodo bind
// const bookEW = book.bind(euroWings);
// bookEW(23, 'Jorge Calderita');

// const bookEW23 = book.bind(euroWings, 23);
// bookEW23('Jorge Calderita');
// bookEW23('Ana Rodriguez');

// Con lista de eventos
/* lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  console.log(this.planes);
  this.planes++;
  console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Aplicación parcial
const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); */

// Una funcion que se ejecute una sola vez.
/* (function () {
  console.log('Solo se ejecuta una vez');
})();

(() => console.log('Solo se ejecuta una vez otra vez'))(); */

// Cierres
/* const secureBooking = function () {
  let contadorPasajeros = 0;
  return function () {
    contadorPasajeros++;
    console.log(`${contadorPasajeros} pasajeros.`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();
booker(); */

/* let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f(); */

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
