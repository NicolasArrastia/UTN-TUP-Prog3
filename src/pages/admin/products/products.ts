import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getCategories, getProducts } from "../../../utils/api";

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

const tableBody = document.getElementById(
  "productsTableBody",
) as HTMLTableSectionElement;

const renderProducts = (products: Product[], categories: Category[]) => {
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

const init = async () => {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  renderProducts(products, categories);
};

init();
