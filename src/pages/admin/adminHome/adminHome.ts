import { mountAdminSidebar } from "../../../components/adminSidebar";
import { getCategories, getOrders, getProducts } from "../../../utils/api";

const sidebarContainer = document.getElementById("sidebar") as HTMLElement;

mountAdminSidebar({
  container: sidebarContainer,
  position: "append",
});

const categoriesCount = document.getElementById(
  "categoriesCount",
) as HTMLElement;

const productsCount = document.getElementById("productsCount") as HTMLElement;

const ordersCount = document.getElementById("ordersCount") as HTMLElement;

const availableProductsCount = document.getElementById(
  "availableProductsCount",
) as HTMLElement;

const activeCategories = document.getElementById(
  "activeCategories",
) as HTMLElement;

const activeProducts = document.getElementById("activeProducts") as HTMLElement;

const inactiveProducts = document.getElementById(
  "inactiveProducts",
) as HTMLElement;

const ordersByStatus = document.getElementById("ordersByStatus") as HTMLElement;

const init = async () => {
  const [categories, products, orders] = await Promise.all([
    getCategories(),
    getProducts(),
    getOrders(),
  ]);

  categoriesCount.textContent = String(categories.length);
  productsCount.textContent = String(products.length);
  ordersCount.textContent = String(orders.length);

  const availableProducts = products.filter((product) => product.stock > 0);

  availableProductsCount.textContent = String(availableProducts.length);

  const activeCategoriesList = categories.filter(
    (category) => !category.eliminado,
  );

  activeCategories.textContent = `${activeCategoriesList.length} / ${categories.length}`;

  const activeProductsList = products.filter((product) => product.disponible);

  const inactiveProductsList = products.filter(
    (product) => !product.disponible,
  );

  activeProducts.textContent = String(activeProductsList.length);

  inactiveProducts.textContent = String(inactiveProductsList.length);

  const statusCount = orders.reduce(
    (acc, order) => {
      acc[order.estado] = (acc[order.estado] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  ordersByStatus.innerHTML = Object.entries(statusCount)
    .map(
      ([status, count]) => `
        <div class="flex justify-between">
          <span>${status}</span>
          <span class="font-semibold">${count}</span>
        </div>
      `,
    )
    .join("");
};

init();
