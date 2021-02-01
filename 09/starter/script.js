'use strict';

// Literales mejorados
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Orden recibida! ${this.starterMenu[starterIndex]} y ${this.mainMenu[mainIndex]} enviar a ${address} a las ${time}`);
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Aquí esta tu deliciosa pasta con ${ing1}, ${ing2} y ${ing3}.`);
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Repeticion
const mensaje = 'Bad weather... All departues delayed... ';
console.log(mensaje.repeat(5));

const avionesEnLinea = n => {
  console.log(`Hay ${n} aviones en linea ${'✈'.repeat(n)}`);
};

avionesEnLinea(5);

// Agregar caracteres Padding
/* const mensaje = 'Go to gate 23!';
console.log(mensaje.padStart(25, '+').padEnd(50, '-')); */
// Ejemplo
/* const mascaraTarjeta = function (numero) {
  const str = numero + '';
  const ultimo = str.slice(-4);
  console.log(ultimo.padStart(str.length, '*'));
};

mascaraTarjeta('12345678891231654564'); */

// Split
// console.log('a+very+nice+string'.split('+'));
/* const [nombre, apellido] = 'Jorge Calderita'.split(' ');
console.log(nombre, apellido);
// Unir
const union = ['Mr.', nombre, apellido.toUpperCase()].join(' ');
console.log(union);

const capitalizar = cadena => {
  const arr = cadena.split(' ');
  const arrMay = [];
  for (const item of arr) {
    // arrMay.push(item[0].toUpperCase() + item.slice(1));
    arrMay.push(item.replace(item[0], item[0].toUpperCase()));
  }
  console.log(arrMay.join(' '));
};
capitalizar('jessica ann smith davis');
capitalizar('jonas schmedtmann'); */

// String Cadenas
/* const airline = 'TAP Air Portugal';
// const plane = 'A320';

// Remplazar
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace('.', ',');
console.log(priceUS);

const anuncio = 'All passengers come to boarding door 23. Boarding door 23!';
// Primera ocurrencia
console.log(anuncio.replace('door', 'gate'));
// Todas
console.log(anuncio.replaceAll('door', 'gate'));
// Expresión regular para remplazar todo
console.log(anuncio.replace(/door/g, 'gate'));

// Metodos booleanos
const plane = 'A320neo';
// Incluido
console.log(plane.includes('A320'));
console.log(plane.includes('Airbua'));
// Comienza con
console.log(plane.startsWith('A3'));
console.log(plane.startsWith('Air'));
// Finaliza con
console.log(plane.endsWith('neo'));
console.log(plane.endsWith('oen'));

// Ejercicio
const checkEquipaje = items => {
  const equipaje = items.toLowerCase();
  console.log(equipaje.includes('knife') || equipaje.includes('gun') ? 'No pasa' : 'Pasa');
};
checkEquipaje('I have a laptop, some Food and a pocket Knife');
checkEquipaje('Socks and camera');
checkEquipaje('Got some snacks and a gun for protection'); */

// Comparar correo
/* const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const emailCorrecto = loginEmail.toLowerCase().trim();
console.log(emailCorrecto === email); */

// Capitalización
/* console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

let pasajero = 'jOnAS';
pasajero = pasajero[0].toUpperCase() + pasajero.toLowerCase().slice(1);
console.log(pasajero); */

// Principio
/* console.log(airline.indexOf('r'));
// Final
console.log(airline.lastIndexOf('r'));

// Encuentra la palabra entera donde empieza
console.log(airline.indexOf('Portugal'));
// Diferencia mayúsculas y minúsculas
console.log(airline.indexOf('portugal'));

// Extraer
console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
// Desde el final
console.log(airline.slice(-5));
// Empezamos del principio y corta parametros al final
console.log(airline.slice(1, -3));
// Funciones
const asientoMedio = asiento => {
  const s = asiento.slice(-1);
  s === 'B' || s === 'E' ? console.log('Estás en un asiento de en medio.', s) : console.log('No estas');
};
asientoMedio('11B');
asientoMedio('23C');
asientoMedio('3E'); */

// Mapas iteración
/* const question = new Map([
  ['Pregunta', 'Cual es el mejor lenguaje de programación del mundo?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['Correcto', 3],
  [true, 'Has acertado'],
  [false, 'Has fallado'],
]);
// console.log(question);
// Convertir objetos en mapas
const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

for (const [key, valor] of question) typeof key === 'number' && console.log(key, valor);
const respuesta = 1;
// console.log(question.get(respuesta === question.get('Correcto')));

// Convertir Mapa en Matriz
console.log(...question);
console.log([...question]);
console.log(question.entries());
console.log(question.keys());
console.log(question.values()); */

// Mapas
/* const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy').set(2, 'Lisbon, Portugal').set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']).set('open', 11).set('close', 23).set(true, 'We are open').set(false, 'We are closed');
console.log(rest);
console.log(rest.get('name'));
// console.log(rest.get(true));
// for (const [key, valor] of rest.entries()) console.log(key, valor);
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr));
rest.set(document.querySelector('h1'), 'Cabecera');
console.log(rest);
rest.clear(); */

// Ejemplo conjuntos
/* const empleados = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const empleadosUnicos = [...new Set(empleados)];
console.log(empleadosUnicos); */
/* // Sets Conjuntos
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet);
// tamaño
console.log(ordersSet.size);
// tiene
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
// agregar
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet);
// Recorrer
for (const order of ordersSet) console.log(order);
// Borrar todos los elementos
ordersSet.clear();
console.log(ordersSet); */

// Loop sobre objetos
// Valores de nombres
/* const valores = Object.values(openingHours);
console.log(valores); */

// Objeto entero
/* const entradas = Object.entries(openingHours);
console.log(entradas);
for (const [key, { open, close }] of entradas) {
  console.log(`En ${key} estamos abiertos de ${open} a ${close}`);
} */

// Propiedades de nombres
/* const propiedades = Object.keys(openingHours);
console.log(propiedades);

console.log(`Estamos abiertos ${propiedades.length} días.`);

for (const day of Object.keys(openingHours)) {
  console.log(day);
} */

// Encadenamiento opcional
// console.log(restaurant.openingHours?.mon?.open);
/* const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  open !== 'closed' && console.log(`El día ${day}, abrimos a las ${open}`);
} */

// Encadenamiento opcional con metodos
/* console.log(restaurant.order?.(0, 1) ?? 'Metodo no existe');
console.log(restaurant.ordenar?.(0, 1) ?? 'Metodo no existe'); */

// Encadenamiento opcional arrays
/* const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'Usuario no existe');
console.log(users[1]?.name ?? 'Usuario no existe'); */

// Literales mejorados
// console.log(restaurant.openingHours);

// for loop
/* const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item); */
// Indices
// for (const [ind, valor] of menu.entries()) console.log(ind + 1, valor);

// Operador coalesce
/* restaurant.numGuests = 0;
const invitados = restaurant.numGuests || 10;
console.log(invitados); */

// Null y undefined son falsos, 0 o '' no lo son
/* const invitadosCorrectos = restaurant.numGuests ?? 10;
console.log(invitadosCorrectos); */

// Operadores lógicos AND
/* console.log(0 && 'Jonas'); //Devuelve el primero falso
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');

restaurant.orderPizza && restaurant.orderPizza('champiñones', 'espinacas'); */

// Operadores lógicos OR
/* console.log(3 || 'Jonas'); // Primer valor verdadero
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null); */

/* const invitados = restaurant.numGuests || 10;
console.log(invitados); */

/* restaurant.orderPizza('champiñones', 'cebolla', 'olivas', 'espinacas');
restaurant.orderPizza('champiñones'); */

// Funciones
/* const add = (...numbers) => {
  // console.log(numbers);
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); */

// Operador propragación empaquetar elementos
// Desempaquetar
/* const arr = [1, 2, ...[3, 4]]; */
// Empaquetar
/* const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); */

/* const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood); */

// Objetos
/* const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays); */

// Copiar Objetos y crear nuevos
/* const nuevoRestaurante = { founded: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(nuevoRestaurante);

const copiaRestaurante = { ...restaurant };
copiaRestaurante.name = 'Pepito perez';
console.log(restaurant.name, copiaRestaurante.name); */

// Funciones con paso de muchos parametros
/* const ingredientes = ['Queso', 'Tomate', 'Anchoas'];
restaurant.orderPasta(...ingredientes); */

// Iterables: arrays, strings, maps, sets. Not objects
/* const str = 'Jonas';
const letras = [...str, ' ', 'S.'];
console.log(letras);
console.log(...str);
console.log(); */

// Fusionar arrays
/* const copiaMenu = [...restaurant.mainMenu];
console.log(copiaMenu);

const fusionMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(fusionMenu); */

// Desempaquetando arrays con el metodo propagación
/* const arr = [4, 5, 6];
const newArray = [1, 2, 3, ...arr];
console.log(newArray);

const nuevoMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(nuevoMenu); */

// Llamadas a funciones estructuradas
/* restaurant.orderDelivery({ time: '22:30', address: 'Via del Sole, 21', mainIndex: 2, starterIndex: 2 });
restaurant.orderDelivery({ address: 'Casa' }); */

// Objetos anidados
/* const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c); */

// Mutación de variables al estructurar objetos
/* let a = 111;
let b = 999;
const obj = { a: 1, b: 2, c: 3 };
({ a, b } = obj);
console.log(a, b); */

// Restructurar objetos con valores por defecto
/* const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); */

// Restructurar objetos
/* const { name: nombre, categories, openingHours } = restaurant;
console.log(nombre, categories, openingHours); */

//Estructurando arrays con valores por defecto
/* const [a = 0, b = 0, c = 0] = [1, 2];
console.log(a, b, c); */

// Arrays Anidados
/* const nested = [2, 4, [5, 6]];
const [uno, dos, [, cuatro]] = nested;
console.log(uno, dos, cuatro); */

// Restructuración con funciones de objeto
/* const [starter, main] = restaurant.order(1, 2);
console.log(starter, main); */

// Obtener valores arrays estructurados y cambiar orden
/* let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary); */

// Reestructurar arrays
/* let [a, b, c] = [2, 3, 4];
console.log(a, b, c);
const arr = [6, 7, 8];
[a, b, c] = arr; 
console.log(a, b, c); */
