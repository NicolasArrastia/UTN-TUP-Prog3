import { getCart } from "./cart";

export const updateCartBadge = () => {
  const badge = document.getElementById("cartBadge");
  console.log(badge);

  if (!badge) {
    return;
  }

  const cart = getCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  badge.textContent = String(totalItems);
  badge.classList.toggle("hidden", totalItems === 0);
};
