export type OrderStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "TERMINADO"
  | "CANCELADO";
export type PaymentMethod = "TARJETA" | "TRANSFERENCIA" | "EFECTIVO";

export interface OrderDetail {
  idProducto: number;
  cantidad: number;
  subtotal: number;
}

export interface Order {
  id: number;
  fecha: string;
  estado: OrderStatus;
  total: number;
  formaPago: PaymentMethod;
  idUsuario: number;
  detalles: OrderDetail[];
}
