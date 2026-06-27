import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Category } from "../../../types/category";
import { getCategories } from "../../../utils/api";

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

const tableBody = document.getElementById(
  "categoriesTableBody",
) as HTMLTableSectionElement;

const renderCategories = (categories: Category[]) => {
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
        </tr>
      `,
    )
    .join("");
};

const init = async () => {
  const categories = await getCategories();

  renderCategories(categories);
};

init();
