import { checkAuhtUser, logout } from "../../../utils/auth";
import { getCategories, PRODUCTS } from "../../../data/data";
import type { Product } from "../../../types/Product";
import { addToCart } from "../cart/cart";

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

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button>Agregar</button>
    `;

    const button = div.querySelector("button") as HTMLButtonElement;
    console.log(button);

    button.addEventListener("click", () => {
      addToCart(product);
      alert("Producto agregado");
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

// Init functiod
const initPage = () => {
  console.log("inicio de pagina");

  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );

  renderProducts(PRODUCTS);
  renderCategories();
};

initPage();
