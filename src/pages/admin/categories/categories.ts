import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Category } from "../../../types/category";
import { getCategories } from "../../../utils/api";

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

let categories: Category[] = [];
let editingCategoryId: number | null = null;

const tableBody = document.getElementById(
  "categoriesTableBody",
) as HTMLTableSectionElement;

const newCategoryButton = document.getElementById(
  "newCategoryButton",
) as HTMLButtonElement;

const categoryModal = document.getElementById("categoryModal") as HTMLElement;

const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

const categoryForm = document.getElementById("categoryForm") as HTMLFormElement;

const modalTitle = document.getElementById("modalTitle") as HTMLElement;

const submitButton = document.getElementById(
  "submitButton",
) as HTMLButtonElement;

const nameInput = document.getElementById("name") as HTMLInputElement;

const descriptionInput = document.getElementById(
  "description",
) as HTMLTextAreaElement;

const imageInput = document.getElementById("image") as HTMLInputElement;

const closeCategoryModal = () => {
  categoryModal.classList.add("hidden");
  categoryModal.classList.remove("flex");
};

const renderCategories = () => {
  tableBody.innerHTML = categories
    .map(
      (category) => `
        <tr class="hover:bg-gray-50">
          <td class="px-5 py-4 font-medium">
            ${category.id}
          </td>

          <td class="px-5 py-4">
            <img
              src="${category.imagen}"
              alt="${category.nombre}"
              class="h-14 w-14 rounded-lg object-cover"
            />
          </td>

          <td class="px-5 py-4 font-medium">
            ${category.nombre}
          </td>

          <td class="px-5 py-4 text-gray-600">
            ${category.descripcion}
          </td>

          <td class="px-5 py-4">
            <div class="flex justify-center gap-2">

              <button
                class="edit-category rounded bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600"
                data-id="${category.id}"
              >
                Editar
              </button>

              <button
                class="delete-category rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
                data-id="${category.id}"
              >
                Eliminar
              </button>

            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  document.querySelectorAll(".edit-category").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      editCategory(Number((button as HTMLButtonElement).dataset.id));
    });
  });

  document.querySelectorAll(".delete-category").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      deleteCategory(Number((button as HTMLButtonElement).dataset.id));
    });
  });
};

const editCategory = (id: number) => {
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return;
  }

  editingCategoryId = id;

  modalTitle.textContent = "Editar categoría";
  submitButton.textContent = "Guardar cambios";

  nameInput.value = category.nombre;
  descriptionInput.value = category.descripcion;
  imageInput.value = category.imagen;

  categoryModal.classList.remove("hidden");
  categoryModal.classList.add("flex");
};

const deleteCategory = (id: number) => {
  categories = categories.filter((category) => category.id !== id);

  renderCategories();
};

newCategoryButton.addEventListener("click", () => {
  editingCategoryId = null;

  modalTitle.textContent = "Nueva categoría";
  submitButton.textContent = "Crear categoría";

  categoryForm.reset();

  categoryModal.classList.remove("hidden");
  categoryModal.classList.add("flex");
});

closeModal.addEventListener("click", closeCategoryModal);

categoryModal.addEventListener("click", (event) => {
  if (event.target === categoryModal) {
    closeCategoryModal();
  }
});

categoryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const categoryData = {
    nombre: nameInput.value,
    descripcion: descriptionInput.value,
    imagen: imageInput.value,
  };

  if (editingCategoryId === null) {
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      ...categoryData,
    };

    categories.unshift(newCategory);
  } else {
    const category = categories.find((c) => c.id === editingCategoryId);

    if (category) {
      category.nombre = categoryData.nombre;
      category.descripcion = categoryData.descripcion;
      category.imagen = categoryData.imagen;
    }
  }

  renderCategories();

  categoryForm.reset();

  closeCategoryModal();
});

const init = async () => {
  categories = await getCategories();

  renderCategories();
};

init();
