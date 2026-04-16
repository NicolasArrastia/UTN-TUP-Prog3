import type { CartItem, Product } from "../types/product";
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

export const removeFromCart = (productId: number): void => {
  const updated = getCart().filter((item) => item.product.id !== productId);

  setItem(CART_KEY, updated);
};

export const updateQuantity = (productId: number, quantity: number): void => {
  const cart = getCart();

  const item = cart.find((i) => i.product.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    setItem(
      CART_KEY,
      cart.filter((i) => i.product.id !== productId),
    );
    return;
  }

  item.quantity = quantity;
  setItem(CART_KEY, cart);
};

export const getTotal = (): number => {
  return getCart().reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0,
  );
};

export const getCartCount = (): number => {
  return getCart().reduce((t, i) => t + i.quantity, 0);
};
