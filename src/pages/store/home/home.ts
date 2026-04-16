import "../../../global.css";
import "./home.css";

import { checkAuhtUser, logout } from "../../../utils/auth";
import { getCategories, PRODUCTS } from "../../../data/data";
import type { Product } from "../../../types/Product";
import { addToCart } from "../../../utils/cart";

// Logout button
const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => logout());

// Products rendering
const productsContainer = document.getElementById("products") as HTMLDivElement;

const renderProducts = (products: Product[]) => {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<p>No hay productos</p>";
    return;
  }

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";

    div.innerHTML = `
      <h3 class="product-card__title">${product.name}</h3>
      <p class="product-card__price">$${product.price}</p>
      <button class="product-card__button">Agregar</button>
    `;

    const button = div.querySelector("button") as HTMLButtonElement;
    console.log(button);

    button.addEventListener("click", () => {
      addToCart(product);
      renderCartCount();
    });

    productsContainer.appendChild(div);
  });
};

// Search logic
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(value),
  );

  renderProducts(filtered);
});

// Categories logic
const categoriesContainer = document.getElementById(
  "categories",
) as HTMLDivElement;

const renderCategories = () => {
  const categories = getCategories();

  categoriesContainer.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "Todas";
  allBtn.addEventListener("click", () => renderProducts(PRODUCTS));
  categoriesContainer.appendChild(allBtn);

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;

    btn.addEventListener("click", () => {
      const filtered = PRODUCTS.filter((p) => p.category === category);
      renderProducts(filtered);
    });

    categoriesContainer.appendChild(btn);
  });
};

// Init function
const initPage = () => {
  console.log("inicio de pagina");

  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );

  renderProducts(PRODUCTS);
  renderCategories();
  renderCartCount();
};

import { getCartCount } from "../../../utils/cart";
// Update cart count
const cartCountElement = document.getElementById(
  "cartCount",
) as HTMLSpanElement;

const renderCartCount = () => {
  cartCountElement.textContent = String(getCartCount());

  cartCountElement.classList.add("header__cart-count--animate");

  setTimeout(() => {
    cartCountElement.classList.remove("header__cart-count--animate");
  }, 200);
};

const count = getCartCount();
cartCountElement.textContent = String(count);
cartCountElement.style.display = count === 0 ? "none" : "inline-block";

initPage();
