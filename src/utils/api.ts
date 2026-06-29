import { Category } from "../types/category";
import { Order, OrderDetail } from "../types/order";
import { Product } from "../types/product";
import { User } from "../types/user";
import {
  getOrders as getLocalOrders,
  PopulatedOrder,
  PopulatedOrderDetail,
  populateOrderDetails,
} from "./orders";

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

export async function getOrders(): Promise<PopulatedOrder[]> {
  const ordersJSON = await getData<Order[]>("/data/pedidos.json");
  const ordersLocalStorage = getLocalOrders();

  return await populateOrderDetails([...ordersJSON, ...ordersLocalStorage]);
}
