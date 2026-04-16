import "../../../global.css";
import "../auth.css";
import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";
import {
  getItem,
  getUsers,
  saveSession,
  setUsers,
} from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  const users = getUsers();

  const userFound = users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!userFound) {
    alert("Credenciales incorrectas");
    return;
  }

  const sessionUser: IUser = {
    ...userFound,
    loggedIn: true,
  };

  // update users array
  const updatedUsers = users.map((u) =>
    u.email === sessionUser.email ? sessionUser : u,
  );

  setUsers(updatedUsers);
  saveSession(sessionUser);

  if (sessionUser.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/store/home/home.html");
  }
});
