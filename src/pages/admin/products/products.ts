import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getCategories, getProducts } from "../../../utils/api";

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

let products: Product[] = [];
let categories: Category[] = [];

const newProductButton = document.getElementById(
  "newProductButton",
) as HTMLButtonElement;

const productModal = document.getElementById("productModal") as HTMLElement;

const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

const productForm = document.getElementById("productForm") as HTMLFormElement;

const tableBody = document.getElementById(
  "productsTableBody",
) as HTMLTableSectionElement;

const categorySelect = document.getElementById("category") as HTMLSelectElement;

const renderProducts = () => {
  tableBody.innerHTML = products
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoriaId);

      return `
        <tr class="hover:bg-gray-50">
          <td class="px-5 py-4 font-medium">
            ${product.id}
          </td>

          <td class="px-5 py-4">
            <img
              src="${product.imagen}"
              alt="${product.nombre}"
              class="h-14 w-14 rounded-lg object-cover"
            />
          </td>

          <td class="px-5 py-4 font-medium">
            ${product.nombre}
          </td>

          <td class="max-w-xs px-5 py-4 text-gray-600">
            ${product.descripcion}
          </td>

          <td class="px-5 py-4 font-semibold">
            $${product.precio}
          </td>

          <td class="px-5 py-4">
            ${category?.nombre ?? "-"}
          </td>

          <td class="px-5 py-4">
            ${product.stock}
          </td>

          <td class="px-5 py-4">
            <span
              class="rounded-full px-3 py-1 text-sm font-medium ${
                product.disponible
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }"
            >
              ${product.disponible ? "Activo" : "Inactivo"}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
};

const fillCategories = () => {
  categorySelect.innerHTML = categories
    .map(
      (category) => `
        <option value="${category.id}">
          ${category.nombre}
        </option>
      `,
    )
    .join("");
};

const closeProductModal = () => {
  productModal.classList.add("hidden");
  productModal.classList.remove("flex");
};

newProductButton.addEventListener("click", () => {
  productModal.classList.remove("hidden");
  productModal.classList.add("flex");
});

closeModal.addEventListener("click", closeProductModal);

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct: Product = {
    id: Math.max(...products.map((p) => p.id)) + 1,
    nombre: (document.getElementById("name") as HTMLInputElement).value,
    descripcion: (document.getElementById("description") as HTMLTextAreaElement)
      .value,
    imagen: (document.getElementById("image") as HTMLInputElement).value,
    precio: Number(
      (document.getElementById("price") as HTMLInputElement).value,
    ),
    categoriaId: Number(categorySelect.value),
    stock: Number((document.getElementById("stock") as HTMLInputElement).value),
    disponible: (document.getElementById("available") as HTMLInputElement)
      .checked,
    eliminado: false,
  };

  products.unshift(newProduct);

  renderProducts();

  productForm.reset();

  (document.getElementById("available") as HTMLInputElement).checked = true;

  closeProductModal();
});

const init = async () => {
  [products, categories] = await Promise.all([getProducts(), getCategories()]);

  fillCategories();

  renderProducts();
};

init();
