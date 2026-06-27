import { logout } from "../utils/auth";
import { navigate, ROUTES } from "../utils/navigate";

export type AdminSidebarConfig = {
  container?: HTMLElement;
  position?: "prepend" | "append";
};

export const createAdminSidebar = () => {
  const aside = document.createElement("aside");
  aside.className =
    "sticky top-0 flex h-screen w-64 flex-col bg-white p-6 shadow";

  const title = document.createElement("h1");
  title.textContent = "Food Store";
  title.className = "cursor-pointer text-2xl font-bold text-orange-600";

  title.addEventListener("click", () => {
    navigate(ROUTES.ADMIN_HOME);
  });

  const nav = document.createElement("nav");
  nav.className = "mt-8 flex flex-col gap-2";

  const createButton = (text: string, route: string) => {
    const button = document.createElement("button");

    button.textContent = text;
    button.className =
      "rounded-lg px-4 py-3 text-left font-medium transition hover:bg-orange-100";

    button.addEventListener("click", () => {
      navigate(route);
    });

    return button;
  };

  nav.append(
    createButton("Dashboard", ROUTES.ADMIN_HOME),
    createButton("Categorías", ROUTES.ADMIN_CATEGORIES),
    createButton("Productos", ROUTES.ADMIN_PRODUCTS),
    createButton("Pedidos", ROUTES.ADMIN_ORDERS),
    createButton("Ver tienda", ROUTES.HOME),
  );

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Cerrar sesión";
  logoutButton.className =
    "mt-auto rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600";

  logoutButton.addEventListener("click", logout);

  aside.append(title, nav, logoutButton);

  return aside;
};

export const mountAdminSidebar = (config?: AdminSidebarConfig) => {
  const sidebar = createAdminSidebar();

  const target = config?.container ?? document.body;

  if (config?.position === "append") {
    target.appendChild(sidebar);
  } else {
    target.prepend(sidebar);
  }

  return sidebar;
};
