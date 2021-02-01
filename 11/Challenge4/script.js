'use strict';

/* const checkDogs = (perrosJulia, perrosKate) => {
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

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const calcAverageHumanAge = edades =>
  edades
    .map(e => (e <= 2 ? e * 2 : 16 + e * 4))
    .filter(e => e >= 18)
    .reduce((acc, e, i, arr) => acc + e / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(e => (e.recommndedFood = Math.trunc(e.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const dogSarah = dogs.find(e => e.owners.includes('Sarah'));
console.log(dogSarah?.curFood > dogSarah?.recommndedFood ? `It's eating too much` : `It's eating too little`);

// 3
const ownersEatTooMuch = dogs.filter(val => val.curFood > val.recommndedFood).flatMap(val => val.owners);
const ownersEatTooLittle = dogs.filter(val => val.curFood < val.recommndedFood).flatMap(val => val.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
console.log(ownersEatTooMuch.join(' and ').concat(`'s dogs eat too much!`));
console.log(ownersEatTooLittle.join(' and ').concat(`'s dogs eat too little!`));

// 5
console.log(dogs.some(val => val.curFood === val.recommndedFood * 0.9));

// 6
const checkDogsOK = val => val.curFood > val.recommndedFood * 0.9 && val.curFood < val.recommndedFood * 1.1;
console.log(dogs.some(checkDogsOK));

// 7
const dogsOK = dogs.filter(checkDogsOK);
console.log(dogsOK);

// 8
const dogsOrder = dogs.slice().sort((a, b) => a.recommndedFood > b.recommndedFood);
console.log(dogsOrder);
