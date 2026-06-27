import { getUsers } from "../../../utils/api";
import { saveSession } from "../../../utils/auth";
import { navigate, ROUTES } from "../../../utils/navigate";

const form = document.querySelector<HTMLFormElement>("#login-form");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const passwordInput = document.querySelector<HTMLInputElement>("#password");

const errorMessage =
  document.querySelector<HTMLParagraphElement>("#error-message");

if (!form || !emailInput || !passwordInput || !errorMessage) {
  throw new Error("Login elements not found");
}

async function login(
  email: string,
  password: string,
  errorMessage: HTMLParagraphElement,
): Promise<void> {
  errorMessage.classList.add("hidden");

  if (!email || !password) {
    errorMessage.textContent = "Todos los campos son obligatorios";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    const users = await getUsers();

    const user = users.find((u) => u.mail === email && u.password === password);

    if (!user) {
      errorMessage.textContent = "Credenciales incorrectas";
      errorMessage.classList.remove("hidden");
      return;
    }

    const { password: _, ...sessionUser } = user;

    saveSession(sessionUser);

    navigate(sessionUser.rol === "ADMIN" ? ROUTES.ADMIN_HOME : ROUTES.HOME);
  } catch {
    errorMessage.textContent = "Ocurrió un error al iniciar sesión";
    errorMessage.classList.remove("hidden");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await login(
    emailInput.value.trim(),
    passwordInput.value.trim(),
    errorMessage,
  );
});

// UTILIDADES PARA DEMO
const adminDemo = document.querySelector<HTMLSpanElement>("#admin-demo");
const customerDemo = document.querySelector<HTMLSpanElement>("#customer-demo");
const customer2Demo =
  document.querySelector<HTMLSpanElement>("#customer2-demo");

if (!adminDemo || !customerDemo || !customer2Demo) {
  throw new Error("Demo login elements not found");
}

adminDemo.addEventListener("click", async () => {
  await login("admin@food.com", "admin123", errorMessage);
});

customerDemo.addEventListener("click", async () => {
  await login("cliente@food.com", "cliente123", errorMessage);
});

customer2Demo.addEventListener("click", async () => {
  await login("cliente2@food.com", "cliente123", errorMessage);
});
