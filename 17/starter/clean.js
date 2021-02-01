const shoppingCart = [
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
];

const allowedProducts = {
  lisbon: 5,
  others: 7,
};

const checkCorrectAllowedProducts = (cart, numAllowed, city) => {
  if (!cart.length) return [];

  // const allowed = numAllowed[city] > 0 ? numAllowed[city] : numAllowed.others;
  const allowed = numAllowed?.[city] ?? allowedProducts.others;

  const newCart = cart.map(val => {
    const { product, quantity } = val;
    return { product, quantity: quantity > allowed ? allowed : quantity };
  });

  return newCart;
};

const shoppingNewCart = checkCorrectAllowedProducts(shoppingCart, allowedProducts, 'lisbon');
console.log(shoppingNewCart);

const createOrderDescription = cart => {
  if (!cart.length) return '';

  const [{ product: p, quantity: q }] = cart;

  return `Order with ${q} ${p}${cart.length > 1 && ', etc..'}.`;
};

console.log(createOrderDescription(shoppingNewCart));
