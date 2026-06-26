import { Category } from "../types/category";
import { Order } from "../types/order";
import { Product } from "../types/product";
import { User } from "../types/user";

async function getData<T>(resource: string): Promise<T> {
  const request = await fetch(resource);

  if (!request.ok) {
    throw new Error(`Failed to fetch ${resource}`);
  }

  return request.json();
}

export function getUsers() {
  return getData<User[]>("/data/usuarios.json");
}

export function getCategories() {
  return getData<Category[]>("/data/categorias.json");
}

export function getProducts() {
  return getData<Product[]>("/data/productos.json");
}

export function getOrders() {
  return getData<Order[]>("/data/pedidos.json");
}
