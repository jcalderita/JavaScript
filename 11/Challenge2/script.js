'use strict';

const checkDogs = (perrosJulia, perrosKate) => {
  const perrosJuliaCorrecto = perrosJulia.slice();
  perrosJuliaCorrecto.splice(0, 1);
  perrosJuliaCorrecto.splice(-2);
  console.log(perrosJuliaCorrecto);
  const arrPerros = perrosJuliaCorrecto.concat(perrosKate);
  console.log(arrPerros);
  arrPerros.forEach((e, i) => {
    const str = e >= 3 ? `is an adult, and is ${e} years old` : 'is still a puppy 🐶';
    console.log(`Dog number ${i + 1} ${str}`);
  });
};

/* checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]); */

const calcAverageHumanAge = edades =>
  edades
    .map(e => (e <= 2 ? e * 2 : 16 + e * 4))
    .filter(e => e >= 18)
    .reduce((acc, e, i, arr) => acc + e / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
