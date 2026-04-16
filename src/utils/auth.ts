import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { navigate } from "./navigate";
import { getSession, removeSession } from "./localStorage";

export const checkAuhtUser = (
  redirectIfNotLogged: string,
  redirectIfWrongRole: string,
  role: Rol,
) => {
  const user: IUser | null = getSession();

  if (!user) {
    navigate(redirectIfNotLogged);
    return;
  }

  if (user.role !== role) {
    navigate(redirectIfWrongRole);
  }
};

export const logout = () => {
  removeSession();
  navigate("/src/pages/auth/login/login.html");
};
