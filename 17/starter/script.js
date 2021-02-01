import add, { totalPrice, tq, cart } from './shoppingCart';
add('bread', 13);
console.log(totalPrice, tq);
console.log(cart);

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateDeepClone = cloneDeep(state);

if (module.hot) module.hot.accept();

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jorge = new Person('Jorge');

console.log('Jorge' ?? null);

console.log(cart.filter(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
import 'regenerator-runtime';
