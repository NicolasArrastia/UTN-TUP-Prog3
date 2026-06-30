import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",

  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        // Redirección inicial
        index: resolve(__dirname, "index.html"),

        // Autenticación
        login: resolve(__dirname, "src/pages/auth/login/login.html"),
        register: resolve(__dirname, "src/pages/auth/register/register.html"),

        // Cliente
        storeHome: resolve(__dirname, "src/pages/store/home/home.html"),
        productDetail: resolve(
          __dirname,
          "src/pages/store/productDetail/productDetail.html",
        ),
        storeCart: resolve(__dirname, "src/pages/store/cart/cart.html"),

        // Área del cliente
        clientOrders: resolve(__dirname, "src/pages/client/orders/orders.html"),

        // Administración
        adminHome: resolve(
          __dirname,
          "src/pages/admin/adminHome/adminHome.html",
        ),
        adminCategories: resolve(
          __dirname,
          "src/pages/admin/categories/categories.html",
        ),
        adminProducts: resolve(
          __dirname,
          "src/pages/admin/products/products.html",
        ),
        adminOrders: resolve(__dirname, "src/pages/admin/orders/orders.html"),
      },
    },
  },
});
