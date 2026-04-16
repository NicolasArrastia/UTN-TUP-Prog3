import "../../../global.css";
import "./cart.css";

import {
  getCart,
  getTotal,
  removeFromCart,
  updateQuantity,
} from "../../../utils/cart";
import type { CartItem } from "../../../types/Product";

const cartContainer = document.getElementById(
  "cartContainer",
) as HTMLDivElement;
const totalElement = document.getElementById("total") as HTMLHeadingElement;

const renderCart = () => {
  const cart: CartItem[] = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío</p>";
    totalElement.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-item__info">
        <h3 class="cart-item__title">${item.product.name}</h3>
        <p class="cart-item__price">$${item.product.price}</p>
      </div>

      <div class="cart-item__controls">
        <button class="cart-item__btn decrease">-</button>
        <span class="cart-item__quantity">${item.quantity}</span>
        <button class="cart-item__btn increase">+</button>
      </div>

      <button class="cart-item__delete">Eliminar</button>
    `;

    const decreaseBtn = div.querySelector(".decrease") as HTMLButtonElement;
    const increaseBtn = div.querySelector(".increase") as HTMLButtonElement;
    const deleteBtn = div.querySelector(
      ".cart-item__delete",
    ) as HTMLButtonElement;

    decreaseBtn.addEventListener("click", () => {
      updateQuantity(item.product.id, item.quantity - 1);
      renderCart();
    });

    increaseBtn.addEventListener("click", () => {
      updateQuantity(item.product.id, item.quantity + 1);
      renderCart();
    });

    deleteBtn.addEventListener("click", () => {
      removeFromCart(item.product.id);
      renderCart();
    });

    cartContainer.appendChild(div);
  });

  totalElement.textContent = `Total: $${getTotal()}`;
};

renderCart();
