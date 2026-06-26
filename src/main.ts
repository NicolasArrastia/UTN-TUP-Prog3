import "./style.css";
import { getSessionUser } from "./utils/auth";

const publicPages = [
  "/",
  "/index.html",
  "/src/pages/auth/login/login.html",
  "/src/pages/auth/register/register.html",
];

const adminPages = [
  "/src/pages/admin/adminHome/adminHome.html",
  "/src/pages/admin/categories/categories.html",
  "/src/pages/admin/products/products.html",
  "/src/pages/admin/orders/orders.html",
];

const currentPath = window.location.pathname;

const currentUser = getSessionUser();

const isPublicPage = publicPages.includes(currentPath);
const isAdminPage = adminPages.includes(currentPath);

if (!currentUser) {
  if (!isPublicPage) {
    window.location.replace("/src/pages/auth/login/login.html");
  }
} else {
  if (isPublicPage) {
    if (currentUser.rol === "ADMIN") {
      window.location.replace("/src/pages/admin/adminHome/adminHome.html");
    } else {
      window.location.replace("/src/pages/store/home/home.html");
    }
  }

  if (isAdminPage && currentUser.rol !== "ADMIN") {
    window.location.replace("/src/pages/store/home/home.html");
  }
}
