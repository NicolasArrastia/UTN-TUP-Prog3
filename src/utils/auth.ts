import { SessionUser } from "../types/sessionUser";
import { navigate, ROUTES } from "./navigate";
import { removeItem, getItem, setItem } from "./storage";

const USER_STORAGE_KEY = "user";

export function saveSession(user: SessionUser): void {
  setItem(USER_STORAGE_KEY, user);
}

export function getSessionUser(): SessionUser | null {
  return getItem<SessionUser>(USER_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getSessionUser() !== null;
}

export function logout(): void {
  removeItem(USER_STORAGE_KEY);
  navigate(ROUTES.LOGIN);
}

export function isAdmin(): boolean {
  return getSessionUser()?.rol === "ADMIN";
}

export function validateSession(): SessionUser {
  const user = getSessionUser();

  if (!user) {
    navigate(ROUTES.LOGIN);
    throw new Error("User is not authenticated");
  }

  return user;
}

export function validateAdminSession(): SessionUser {
  const user = validateSession();

  if (user.rol !== "ADMIN") {
    window.location.href = "/src/pages/store/home/home.html";
    throw new Error("User is not an administrator");
  }

  return user;
}
