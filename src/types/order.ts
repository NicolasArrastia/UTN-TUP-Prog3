export type OrderStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "TERMINADO"
  | "CANCELADO";

export const PAYMENT_METHODS = [
  "TARJETA",
  "TRANSFERENCIA",
  "EFECTIVO",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

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

  subtotal: number;
  telefono?: string;
  direccion?: string;
  notas?: string;
  costoEnvio: number;
}
