import { getUsers } from "../../../utils/api";
import { saveSession } from "../../../utils/auth";
import { navigate, ROUTES } from "../../../utils/navigate";
import type { User } from "../../../types/user";

const form = document.querySelector<HTMLFormElement>("#register-form");
const nameInput = document.querySelector<HTMLInputElement>("#name");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const passwordInput = document.querySelector<HTMLInputElement>("#password");
const errorMessage =
  document.querySelector<HTMLParagraphElement>("#error-message");
const lastnameInput = document.querySelector<HTMLInputElement>("#lastname");
const phoneInput = document.querySelector<HTMLInputElement>("#phone");

if (
  !form ||
  !nameInput ||
  !lastnameInput ||
  !phoneInput ||
  !emailInput ||
  !passwordInput ||
  !errorMessage
) {
  throw new Error("Register elements not found");
}

async function register(
  name: string,
  lastname: string,
  phone: string,
  email: string,
  password: string,
  errorMessage: HTMLParagraphElement,
): Promise<void> {
  errorMessage.classList.add("hidden");

  if (!name || !lastname || !phone || !email || !password) {
    errorMessage.textContent = "Todos los campos son obligatorios";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    const users = await getUsers();

    const exists = users.find((u) => u.mail === email);

    if (exists) {
      errorMessage.textContent = "El email ya está registrado";
      errorMessage.classList.remove("hidden");
      return;
    }

    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      nombre: name,
      apellido: lastname,
      celular: phone,
      mail: email,
      password,
      rol: "USUARIO",
    };

    const { password: _, ...sessionUser } = newUser;

    saveSession(sessionUser);

    navigate(ROUTES.HOME);
  } catch {
    errorMessage.textContent = "Ocurrió un error al crear la cuenta";
    errorMessage.classList.remove("hidden");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await register(
    nameInput.value.trim(),
    lastnameInput.value.trim(),
    phoneInput.value.trim(),
    emailInput.value.trim(),
    passwordInput.value.trim(),
    errorMessage,
  );
});
