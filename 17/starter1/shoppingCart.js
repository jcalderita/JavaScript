// console.log('Exportar módulo');

const shippingCost = 10;
const cart = [];

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 537;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq, cart };

export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
