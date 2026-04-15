import type { IUser } from "../types/IUser";

// Users management
export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("users", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("users");
};
export const removeUser = () => {
  localStorage.removeItem("users");
};

// Product management
export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
