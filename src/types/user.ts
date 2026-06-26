export type Role = "ADMIN" | "USUARIO";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  celular?: string;
  password?: string;
  rol: Role;
}
