import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getCategories, getProducts } from "../../../utils/api";

const IS_TESTING = true;

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

let products: Product[] = [];
let categories: Category[] = [];

let editingProductId: number | null = null;

const newProductButton = document.getElementById(
  "newProductButton",
) as HTMLButtonElement;

const productModal = document.getElementById("productModal") as HTMLElement;

const modalTitle = document.getElementById("modalTitle") as HTMLElement;

const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

const productForm = document.getElementById("productForm") as HTMLFormElement;

const tableBody = document.getElementById(
  "productsTableBody",
) as HTMLTableSectionElement;

const categorySelect = document.getElementById("category") as HTMLSelectElement;

const nameInput = document.getElementById("name") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "description",
) as HTMLTextAreaElement;
const imageInput = document.getElementById("image") as HTMLInputElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const stockInput = document.getElementById("stock") as HTMLInputElement;
const availableInput = document.getElementById("available") as HTMLInputElement;

const openModal = () => {
  productModal.classList.remove("hidden");
  productModal.classList.add("flex");
};

const closeProductModal = () => {
  productModal.classList.add("hidden");
  productModal.classList.remove("flex");
};

const resetForm = () => {
  productForm.reset();
  availableInput.checked = true;
  editingProductId = null;
  modalTitle.textContent = "Nuevo producto";
};

const fillCategories = () => {
  categorySelect.innerHTML = categories
    .map(
      (c) => `
      <option value="${c.id}">
        ${c.nombre}
      </option>
    `,
    )
    .join("");
};

const renderProducts = () => {
  tableBody.innerHTML = products
    .map((product) => {
      const category = categories.find((c) => c.id === product.categoriaId);

      return `
        <tr class="hover:bg-gray-50">
          <td class="px-5 py-4 font-medium">${product.id}</td>

          <td class="px-5 py-4">
            <img src="${product.imagen}" class="h-14 w-14 rounded-lg object-cover" />
          </td>

          <td class="px-5 py-4 font-medium">${product.nombre}</td>

          <td class="max-w-xs px-5 py-4 text-gray-600">${product.descripcion}</td>

          <td class="px-5 py-4 font-semibold">$${product.precio}</td>

          <td class="px-5 py-4">${category?.nombre ?? "-"}</td>

          <td class="px-5 py-4">${product.stock}</td>

          <td class="px-5 py-4">
            <span class="rounded-full px-3 py-1 text-sm font-medium ${
              product.disponible
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }">
              ${product.disponible ? "Activo" : "Inactivo"}
            </span>
          </td>

          <td class="px-5 py-4">
            <div class="flex justify-center gap-2">
            
              <button
                data-edit="${product.id}"
                class="edit-category rounded bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600"
              >
                Editar
              </button>
              
              <button
                data-delete="${product.id}"
                class="delete-category rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  document.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).dataset.edit);
      const product = products.find((p) => p.id === id);

      if (!product) return;

      editingProductId = id;

      modalTitle.textContent = "Editar producto";

      nameInput.value = product.nombre;
      descriptionInput.value = product.descripcion;
      imageInput.value = product.imagen;
      priceInput.value = String(product.precio);
      stockInput.value = String(product.stock);
      categorySelect.value = String(product.categoriaId);
      availableInput.checked = product.disponible;

      openModal();
    });
  });

  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).dataset.delete);
      products = products.filter((p) => p.id !== id);
      renderProducts();
    });
  });
};

newProductButton.addEventListener("click", () => {
  resetForm();
  if (IS_TESTING) setTestValues();
  openModal();
});

closeModal.addEventListener("click", closeProductModal);

productModal.addEventListener("click", (e) => {
  if (e.target === productModal) closeProductModal();
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data: Product = {
    id: editingProductId ?? Math.max(0, ...products.map((p) => p.id)) + 1,
    nombre: nameInput.value,
    descripcion: descriptionInput.value,
    imagen: imageInput.value,
    precio: Number(priceInput.value),
    stock: Number(stockInput.value),
    categoriaId: Number(categorySelect.value),
    disponible: availableInput.checked,
    eliminado: false,
  };

  if (editingProductId) {
    products = products.map((p) => (p.id === editingProductId ? data : p));
  } else {
    products.unshift(data);
  }

  closeProductModal();
  resetForm();
  renderProducts();
});

const setTestValues = () => {
  nameInput.value = "Hamburguesa Triple Bacon";
  descriptionInput.value =
    "Hamburguesa con triple carne, cheddar y panceta crocante.";
  imageInput.value =
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
  priceInput.value = "6500";
  stockInput.value = "25";
  categorySelect.selectedIndex = 0;
  availableInput.checked = true;
};

const init = async () => {
  [products, categories] = await Promise.all([getProducts(), getCategories()]);

  fillCategories();
  renderProducts();
};

init();
