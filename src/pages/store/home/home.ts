import { logout } from "../../../utils/auth";

import { getCategories, getProducts } from "../../../utils/api";

import type { Category } from "../../../types/category";
import type { Product } from "../../../types/product";
import { addToCart, getCartItemsCount } from "../../../utils/cart";
import { navigate, ROUTES } from "../../../utils/navigate";
import { updateCartBadge } from "../../../utils/updateCartBadge";

let categories: Category[] = [];

let products: Product[] = [];
let filteredProducts: Product[] = [];

let selectedCategoryId: number | null = null;

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;

const logoutButton = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;

const categoriesContainer = document.getElementById(
  "categoriesContainer",
) as HTMLDivElement;

const productsContainer = document.getElementById(
  "productsContainer",
) as HTMLDivElement;

const initialize = async (): Promise<void> => {
  registerEvents();

  await loadData();

  renderCategories();

  applyFilters();

  updateCartBadge();
};

const registerEvents = (): void => {
  logoutButton.addEventListener("click", logout);

  searchInput.addEventListener("input", applyFilters);

  sortSelect.addEventListener("change", applyFilters);
};

const loadData = async (): Promise<void> => {
  categories = await getCategories();

  products = (await getProducts()).filter(
    (product) => product.disponible && !product.eliminado,
  );
};

const renderCategories = (): void => {
  categoriesContainer.innerHTML = "";

  const createButton = (label: string, onClick: () => void, active = false) => {
    const button = document.createElement("button");

    button.textContent = label;

    button.className = `
      w-full rounded-lg px-4 py-2 text-left text-sm font-medium
      transition-all duration-200
      hover:bg-orange-50 hover:text-orange-600
      ${active ? "bg-orange-500 text-white shadow" : "bg-white text-gray-700"}
    `;

    button.addEventListener("click", onClick);

    return button;
  };

  categoriesContainer.appendChild(
    createButton(
      "Todas",
      () => {
        selectedCategoryId = null;
        renderCategories();
        applyFilters();
      },
      selectedCategoryId === null,
    ),
  );

  categories.forEach((category) => {
    categoriesContainer.appendChild(
      createButton(
        category.nombre,
        () => {
          selectedCategoryId = category.id;
          renderCategories();
          applyFilters();
        },
        selectedCategoryId === category.id,
      ),
    );
  });
};

const renderProducts = (): void => {
  productsContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <p class="text-gray-500">No se encontraron productos.</p>
    `;
    return;
  }

  filteredProducts.forEach((product) => {
    const article = document.createElement("article");

    article.className = `
      overflow-hidden rounded-xl bg-white shadow
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
    `;

    const imageSrc = product.imagen.trim() !== "" ? product.imagen : null;

    const imageHtml = imageSrc
      ? `
        <img
          src="${imageSrc}"
          alt="${product.nombre}"
          class="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      `
      : `
        <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <span class="text-sm text-gray-400">Sin imagen</span>
        </div>
      `;

    article.innerHTML = `
      <div class="h-48 overflow-hidden bg-gray-100">
        ${imageHtml}
      </div>

      <div class="space-y-3 p-4">
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-base font-semibold text-gray-800">
            ${product.nombre}
          </h3>

          <span class="font-bold text-orange-600">
            $${product.precio}
          </span>
        </div>

        <p class="line-clamp-2 text-sm text-gray-600">
          ${product.descripcion}
        </p>

        <div class="flex items-center justify-between">
          <span class="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
            Disponible
          </span>

          <div class="flex gap-2">
            <button
              class="details-button rounded-lg border border-orange-500 px-3 py-1 text-sm text-orange-600 transition hover:bg-orange-50"
            >
              Ver detalles
            </button>

            <button
              class="cart-button rounded-lg bg-orange-500 px-3 py-1 text-sm text-white transition hover:bg-orange-600 active:scale-95"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;

    const detailsButton = article.querySelector(
      ".details-button",
    ) as HTMLButtonElement;

    const cartButton = article.querySelector(
      ".cart-button",
    ) as HTMLButtonElement;

    detailsButton.addEventListener("click", () => {
      navigate(ROUTES.PRODUCT_DETAILS(product.id));
    });

    cartButton.addEventListener("click", (event) => {
      event.stopPropagation();

      addToCart(product, 1);

      updateCartBadge();
    });

    productsContainer.appendChild(article);
  });
};

const applyFilters = (): void => {
  filteredProducts = [...products];

  if (selectedCategoryId !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoriaId === selectedCategoryId,
    );
  }

  const search = searchInput.value.trim().toLowerCase();

  if (search !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.nombre.toLowerCase().includes(search),
    );
  }

  switch (sortSelect.value) {
    case "nameAsc":
      filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;

    case "nameDesc":
      filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;

    case "priceAsc":
      filteredProducts.sort((a, b) => a.precio - b.precio);
      break;

    case "priceDesc":
      filteredProducts.sort((a, b) => b.precio - a.precio);
      break;
  }

  renderProducts();
};

initialize();
