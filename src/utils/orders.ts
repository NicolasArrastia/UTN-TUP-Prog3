import { Order, OrderDetail } from "../types/order";
import { Product } from "../types/product";
import { getOrders, getProducts } from "./api";
import { getSessionUser } from "./auth";
import { getItem, setItem } from "./storage";

const ORDERS_KEY = "orders";

export interface PopulatedOrderDetail extends OrderDetail {
  nombre: string;
}

export interface PopulatedOrder extends Omit<Order, "detalles"> {
  detalles: PopulatedOrderDetail[];
}

export const populateOrderDetails = async (orders: Order[]) => {
  const products = await getProducts();

  let formattedOrders = orders.map((order) => ({
    ...order,
    detalles: order.detalles.map((detail) => {
      const product = products.find(
        (product) => product.id === detail.idProducto,
      );

      return {
        ...detail,
        nombre: product?.nombre ?? "Producto eliminado",
      };
    }),
  }));

  return formattedOrders;
};

export const getLocalOrders = (): Order[] => {
  return getItem<Order[]>(ORDERS_KEY) ?? [];
};

export const getOrdersByUser = async (): Promise<PopulatedOrder[]> => {
  const session = getSessionUser();

  if (!session) {
    return [];
  }

  const ordersJSON = await populateOrderDetails(await getLocalOrders());
  const ordersLocal = await getOrders();

  const allOrders: PopulatedOrder[] = [...ordersJSON, ...ordersLocal];

  const orders = allOrders.filter((order) => order.idUsuario === session.id);

  return orders;
};

export const saveOrders = (orders: Order[]): void => {
  setItem(ORDERS_KEY, orders);
};

export const createOrder = (
  order: Omit<Order, "id" | "fecha" | "estado">,
): Order => {
  const orders = getLocalOrders();

  const newOrder: Order = {
    ...order,
    id: Date.now(),
    fecha: new Date().toISOString(),
    estado: "PENDIENTE",
  };

  orders.push(newOrder);

  saveOrders(orders);

  return newOrder;
};
