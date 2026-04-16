import { CartItem, Product } from "../types/Product";
import { getItem, setItem } from "./localStorage";

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

export const removeFromCart = (productId: string): void => {
  const cart = getCart().filter((item) => item.product.id !== productId);
  setItem(CART_KEY, cart);
};

export const updateQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();

  const item = cart.find((i) => i.product.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    // remove if 0
    const updated = cart.filter((i) => i.product.id !== productId);
    setItem(CART_KEY, updated);
    return;
  }

  item.quantity = quantity;
  setItem(CART_KEY, cart);
};

export const getCartCount = (): number => {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};
