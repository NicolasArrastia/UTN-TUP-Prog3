import { Order } from "../types/order";
import { getOrders } from "./api";
import { getItem, removeItem, setItem } from "./storage";

const ORDERS_KEY = "orders";

export const getLocalOrders = (): Order[] => {
  return getItem<Order[]>(ORDERS_KEY) ?? [];
};

export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const orders = await getOrders();
  return orders.filter((o) => o.idUsuario === userId);
};

export const saveLocalOrders = (orders: Order[]): void => {
  setItem(ORDERS_KEY, orders);
};

export const addLocalOrder = (order: Order): void => {
  const orders = getLocalOrders();

  orders.push(order);

  saveLocalOrders(orders);
};

export const clearLocalOrders = (): void => {
  removeItem(ORDERS_KEY);
};
