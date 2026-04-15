import { CartItem, Product } from "../../../types/Product";
import { getItem, setItem } from "../../../utils/localStorage";

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  return getItem<CartItem[]>(CART_KEY) || [];
};

export const addToCart = (product: Product): void => {
  const cart = getCart();

  const existing = cart.find((item) => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  setItem(CART_KEY, cart);
};

export const getTotal = (): number => {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};
