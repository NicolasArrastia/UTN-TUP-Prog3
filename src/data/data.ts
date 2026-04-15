import type { Product } from "../types/Product";

export const PRODUCTS: Product[] = [
  { id: "1", name: "Pizza", price: 2500, category: "Comida" },
  { id: "2", name: "Hamburguesa", price: 1800, category: "Comida" },
  { id: "3", name: "Coca Cola", price: 900, category: "Bebida" },
  { id: "4", name: "Empanadas", price: 1500, category: "Comida" },
  { id: "5", name: "Milanesa", price: 2200, category: "Comida" },
  { id: "6", name: "Papas Fritas", price: 1200, category: "Comida" },
  { id: "7", name: "Agua", price: 700, category: "Bebida" },
  { id: "8", name: "Jugo de Naranja", price: 950, category: "Bebida" },
  { id: "9", name: "Cerveza", price: 1300, category: "Bebida" },
  { id: "10", name: "Helado", price: 1600, category: "Postre" },
];

export const getCategories = (): string[] => {
  return [...new Set(PRODUCTS.map((p) => p.category))];
};
