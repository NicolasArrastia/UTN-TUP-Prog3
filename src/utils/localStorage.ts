import type { IUser } from "../types/IUser";

// GENERIC
export const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// USERS (array)
export const getUsers = (): IUser[] => {
  return getItem<IUser[]>("users") || [];
};

export const setUsers = (users: IUser[]) => {
  setItem("users", users);
};

// SESSION (single user)
export const saveSession = (user: IUser) => {
  setItem("userData", user);
};

export const getSession = (): IUser | null => {
  return getItem<IUser>("userData");
};

export const removeSession = () => {
  localStorage.removeItem("userData");
};
