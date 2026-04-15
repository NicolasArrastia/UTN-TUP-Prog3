import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";
import { saveUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

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

  saveUser(sessionUser);

  if (sessionUser.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/store/home/home.html");
  }
});
