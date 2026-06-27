import { CartItem } from "../../../types/cartItem";
import { getCart, saveCart } from "../../../utils/cart";

const SHIPPING_COST = 0;

let cart: CartItem[] = [];

const cartContainer = document.getElementById(
  "cartContainer",
) as HTMLDivElement;

const subtotalElement = document.getElementById("subtotal") as HTMLSpanElement;

const shippingElement = document.getElementById("shipping") as HTMLSpanElement;

const totalElement = document.getElementById("total") as HTMLSpanElement;

const clearCartButton = document.getElementById(
  "clearCart",
) as HTMLButtonElement;

const initialize = (): void => {
  loadCart();

  renderCart();

  registerEvents();
};

const loadCart = (): void => {
  cart = getCart();
};

const registerEvents = (): void => {
  clearCartButton.addEventListener("click", () => {
    cart = [];

    saveCart(cart);

    renderCart();
  });
};

const renderCart = (): void => {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="rounded-xl bg-white p-10 text-center shadow">
        <p class="text-lg font-medium text-gray-600">
          Tu carrito está vacío
        </p>

        <a
          href="/src/pages/store/home/home.html"
          class="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
        >
          Seguir comprando
        </a>
      </div>
    `;

    updateTotals();
    return;
  }

  cart.forEach((item) => {
    const article = document.createElement("article");

    article.className =
      "flex flex-col gap-4 rounded-xl bg-white p-4 shadow md:flex-row md:items-center";

    const imageHtml =
      item.product.imagen.trim() !== ""
        ? `
          <img
            src="${item.product.imagen}"
            alt="${item.product.nombre}"
            class="h-28 w-full rounded-lg object-cover md:w-36"
          />
        `
        : `
          <div class="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 md:w-36">
            <span class="text-sm text-gray-400">Sin imagen</span>
          </div>
        `;

    article.innerHTML = `
      ${imageHtml}

      <div class="flex-1 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">
          ${item.product.nombre}
        </h3>

        <p class="text-sm text-gray-500">
          ${item.product.descripcion}
        </p>

        <p class="font-semibold text-orange-600">
          $${item.product.precio}
        </p>
      </div>

      <div class="flex flex-col items-end gap-1">

        <div class="flex items-center gap-2">

          <button
            class="decrease h-9 w-9 rounded-lg bg-gray-200 transition hover:bg-gray-300"
          >
            −
          </button>

          <span class="min-w-8 text-center font-semibold">
            ${item.quantity}
          </span>

          <button
            class="increase h-9 w-9 rounded-lg bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            ${item.quantity >= item.product.stock ? "disabled" : ""}
          >
            +
          </button>

        </div>

        <p class="text-xs text-gray-500">
          Stock disponible: ${item.product.stock}
        </p>

        <p class="font-bold text-gray-800">
          $${item.product.precio * item.quantity}
        </p>

        <button
          class="remove rounded-lg px-3 py-1 text-sm text-red-500 transition hover:bg-red-50"
        >
          Eliminar
        </button>

      </div>
    `;

    const decreaseButton = article.querySelector(
      ".decrease",
    ) as HTMLButtonElement;

    const increaseButton = article.querySelector(
      ".increase",
    ) as HTMLButtonElement;

    const removeButton = article.querySelector(".remove") as HTMLButtonElement;

    decreaseButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;

        saveCart(cart);

        renderCart();
      }
    });

    increaseButton.addEventListener("click", () => {
      if (item.quantity >= item.product.stock) {
        return;
      }

      item.quantity++;

      saveCart(cart);

      renderCart();
    });

    removeButton.addEventListener("click", () => {
      cart = cart.filter((c) => c.product.id !== item.product.id);

      saveCart(cart);

      renderCart();
    });

    cartContainer.appendChild(article);
  });

  updateTotals();
};
const updateTotals = (): void => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.precio * item.quantity,
    0,
  );

  const total = subtotal + SHIPPING_COST;

  subtotalElement.textContent = `$${subtotal}`;
  shippingElement.textContent = `$${SHIPPING_COST}`;
  totalElement.textContent = `$${total}`;
};

initialize();
