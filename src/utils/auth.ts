import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  redirectIfNotLogged: string,
  redirectIfWrongRole: string,
  role: Rol,
) => {
  const user = getUSer();

  if (!user) {
    navigate(redirectIfNotLogged);
    return;
  }

  const parsedUser: IUser = JSON.parse(user);

  if (!parsedUser.loggedIn) {
    navigate(redirectIfNotLogged);
    return;
  }

  if (parsedUser.role !== role) {
    navigate(redirectIfWrongRole);
  }
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
