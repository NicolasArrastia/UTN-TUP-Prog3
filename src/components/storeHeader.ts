import { logout } from "../utils/auth";
import { navigate, ROUTES } from "../utils/navigate";
import { updateCartBadge } from "../utils/updateCartBadge";

export type StoreHeaderConfig = {
  container?: HTMLElement;
  position?: "prepend" | "append";
  showSearch?: boolean;
  showSort?: boolean;
  showBack?: boolean;
  showOrders?: boolean;
};

export const createStoreHeader = (config?: StoreHeaderConfig) => {
  const {
    showSearch = false,
    showSort = false,
    showBack = true,
    showOrders = true,
  } = config ?? {};

  const header = document.createElement("header");
  header.className = "bg-white shadow-sm";

  const wrapper = document.createElement("div");
  wrapper.className =
    "mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between";

  const left = document.createElement("div");
  left.className = "flex items-center gap-4";

  const title = document.createElement("h1");
  title.textContent = "Food Store";
  title.className = "text-2xl font-bold text-orange-600 cursor-pointer";

  title.addEventListener("click", () => {
    navigate(ROUTES.HOME);
  });

  left.appendChild(title);

  if (showOrders) {
    const orders = document.createElement("button");
    orders.textContent = "Mis Pedidos";
    orders.className =
      "text-gray-700 font-medium hover:text-orange-600 transition";

    orders.addEventListener("click", () => {
      navigate(ROUTES.MY_ORDERS);
    });

    left.appendChild(orders);
  }

  const right = document.createElement("div");
  right.className = "flex flex-wrap items-center gap-3";

  if (showSearch) {
    const input = document.createElement("input");
    input.id = "searchInput";
    input.type = "search";
    input.placeholder = "Buscar productos...";
    input.className =
      "w-64 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500";
    right.appendChild(input);
  }

  if (showSort) {
    const select = document.createElement("select");
    select.id = "sortSelect";
    select.className =
      "rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500";

    select.innerHTML = `
      <option value="nameAsc">Nombre A-Z</option>
      <option value="nameDesc">Nombre Z-A</option>
      <option value="priceAsc">Precio ↑</option>
      <option value="priceDesc">Precio ↓</option>
    `;

    right.appendChild(select);
  }

  const cart = document.createElement("a");
  cart.href = ROUTES.CART;
  cart.className = "relative rounded-lg p-2 transition hover:bg-gray-100";
  cart.innerHTML = `
    <span class="text-2xl">🛒</span>
    <span id="cartBadge"
      class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
      0
    </span>
  `;

  const logoutBtn = document.createElement("button");
  logoutBtn.id = "logoutButton";
  logoutBtn.textContent = "Cerrar sesión";
  logoutBtn.className =
    "rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600";

  logoutBtn.addEventListener("click", logout);

  right.append(cart, logoutBtn);

  wrapper.append(left, right);
  header.append(wrapper);

  return header;
};

export const mountStoreHeader = (config?: StoreHeaderConfig) => {
  const header = createStoreHeader(config);

  const target = config?.container ?? document.body;

  if (config?.position === "append") {
    target.appendChild(header);
  } else {
    target.prepend(header);
  }

  updateCartBadge();
  return header;
};
