// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/* const x = '23';
if (x === 23) console.log(x);

const calcAge = birthYear => 2037 - birthYear; */

/* const temperaturas = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 15, 9, 5];

const calcularAmplitud = function (temps) {
  let max = temps[0],
    min = temps[0];

  for (let i = 0; i < temps.length; ++i) {
    const temperatura = temps[i];
    if (typeof temperatura !== 'number') continue;
    if (temperatura > max) {
      max = temperatura;
    } else if (temperatura < min) {
      min = temperatura;
    }
  }
  return max - min;
};

console.log(calcularAmplitud(temperaturas));

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
 */

/* const gradosKelvin = function () {
  const medida = {
    tipo: 'temp',
    unit: 'celsius',
    value: Number(prompt('Grados celsius: ')),
  };
  const kelvin = medida.value + 273;
  return kelvin;
};

console.log(gradosKelvin()); */

const imprimirTemperaturas = function (temperaturas) {
  for (let i = 0; i < temperaturas.length; i++) {
    console.log(`${temperaturas[i]} ºC en un ${i} día. `);
  }
};

const datos1 = [17, 21, 23];
const datos2 = [12, 5, -5, 0, 4];

imprimirTemperaturas(datos1);
imprimirTemperaturas(datos2);
