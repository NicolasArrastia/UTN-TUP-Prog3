export const ROUTES = {
  LOGIN: "/src/pages/auth/login/login.html",
  REGISTER: "/src/pages/auth/registro/registro.html",

  // CLIENT ROUTES
  HOME: "/src/pages/store/home/home.html",
  PRODUCT_DETAILS: (id: number | string) =>
    `/src/pages/store/productDetail/productDetail.html?id=${id}`,
  CART: "/src/pages/store/cart/cart.html",
  CHECKOUT: "/src/pages/store/checkout/checkout.html",
  MY_ORDERS: "/src/pages/client/orders/orders.html",

  // ADMIN ROUTES
  ADMIN_HOME: "/src/pages/admin/adminHome/adminHome.html",
  ADMIN_CATEGORIES: "/src/pages/admin/categories/categories.html",
  ADMIN_ORDERS: "/src/pages/admin/orders/orders.html",
  ADMIN_PRODUCTS: "/src/pages/admin/products/products.html",
} as const;

export const navigate = (route: string): void => {
  window.location.href = route;
};
