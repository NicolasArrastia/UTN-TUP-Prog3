import { ICategory } from "./category";

export interface Product {
  id: number;
  eliminado: boolean;
  createdAt: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategory[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
