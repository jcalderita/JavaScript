'use strict';

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

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

checkDogs(dogsJulia, dogsKate);
