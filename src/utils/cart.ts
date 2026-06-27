import { CartItem } from "../types/cartItem";
import { Product } from "../types/product";
import { getSessionUser } from "./auth";
import { getItem, removeItem, setItem } from "./storage";

const session = getSessionUser();

const getCartKey = (): string => {
  const session = getSessionUser();

  if (!session) {
    return "cart_guest";
  }

  return `cart_${session.id}`;
};

const CART_KEY = getCartKey();

export const getCart = (): CartItem[] => {
  return getItem<CartItem[]>(CART_KEY) ?? [];
};

export const saveCart = (cart: CartItem[]): void => {
  setItem(CART_KEY, cart);
};

export const clearCart = (): void => {
  removeItem(CART_KEY);
};

export const addToCart = (product: Product, quantity: number): void => {
  const cart = getCart();

  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product,
      quantity,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (productId: number): void => {
  saveCart(getCart().filter((item) => item.product.id !== productId));
};

export const updateCartItemQuantity = (
  productId: number,
  quantity: number,
): void => {
  const cart = getCart();

  const item = cart.find((item) => item.product.id === productId);

  if (!item) {
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
};

export const getCartItem = (productId: number): CartItem | undefined => {
  return getCart().find((item) => item.product.id === productId);
};

export const isProductInCart = (productId: number): boolean => {
  return getCart().some((item) => item.product.id === productId);
};

export const getCartItemsCount = (): number => {
  return getCart().reduce((total, item) => total + item.quantity, 0);
};

export const getCartSubtotal = (): number => {
  return getCart().reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0,
  );
};
