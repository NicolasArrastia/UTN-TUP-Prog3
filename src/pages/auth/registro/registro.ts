import type { IUser } from "../../../types/IUser";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  if (!email || !password) return;

  const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

  // evitar duplicados
  const exists = users.some((u) => u.email === email);
  if (exists) {
    alert("Usuario ya existe");
    return;
  }

  const newUser: IUser = {
    email,
    password,
    role: "client", // siempre client
    loggedIn: false,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrado correctamente");
});
