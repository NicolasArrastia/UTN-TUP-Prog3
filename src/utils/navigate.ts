export const ROUTES = {
  LOGIN: "/src/pages/auth/login/login.html",
  ADMIN_HOME: "/src/pages/admin/adminHome/adminHome.html",
  HOME: "/src/pages/store/home/home.html",

  PRODUCT_DETAILS: (id: number | string) =>
    `/src/pages/store/productDetail/productDetail.html?id=${id}`,

  CART: "/src/pages/store/cart/cart.html",

  CHECKOUT: "/src/pages/store/checkout/checkout.html",

  MY_ORDERS: "/src/pages/client/orders/orders.html",
} as const;

export const navigate = (route: string): void => {
  window.location.href = route;
};
