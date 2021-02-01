import add, { totalPrice, tq, cart } from './shoppingCart.js';
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
