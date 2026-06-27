import { mountAdminSidebar } from "../../../components/adminSidebar";
import { Order } from "../../../types/order";
import { User } from "../../../types/user";
import { getOrders, getUsers } from "../../../utils/api";

mountAdminSidebar({
  container: document.getElementById("sidebar") as HTMLElement,
  position: "append",
});

const STATUS_COLOR: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-blue-100 text-blue-700",
  TERMINADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
};

const statusFilter = document.getElementById(
  "statusFilter",
) as HTMLSelectElement;

const ordersContainer = document.getElementById(
  "ordersContainer",
) as HTMLElement;

const modal = document.getElementById("orderModal") as HTMLElement;

const modalTitle = document.getElementById("modalTitle") as HTMLElement;

const modalBody = document.getElementById("modalBody") as HTMLElement;

const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

let orders: Order[] = [];
let users: User[] = [];

const formatDate = (date: string) => new Date(date).toLocaleDateString("es-AR");

const getUserName = (userId: number) => {
  const user = users.find((u) => u.id === userId);

  return user?.nombre ?? "Desconocido";
};

const openModal = (order: Order) => {
  modalTitle.textContent = `Pedido #${order.id}`;

  modalBody.innerHTML = `
    <div class="space-y-2">

      <p>
        <strong>Cliente:</strong>
        ${getUserName(order.idUsuario)}
      </p>

      <p>
        <strong>Fecha:</strong>
        ${formatDate(order.fecha)}
      </p>

      <p>
        <strong>Estado:</strong>
        ${order.estado}
      </p>

      <p>
        <strong>Forma de pago:</strong>
        ${order.formaPago}
      </p>

      <hr>

      <h4 class="font-semibold">
        Productos
      </h4>

      <ul class="list-disc pl-5">
        ${order.detalles
          .map(
            (detail) => `
              <li>
                Producto ${detail.idProducto}
                · Cantidad: ${detail.cantidad}
                · Subtotal: $${detail.subtotal}
              </li>
            `,
          )
          .join("")}
      </ul>

      <hr>

      <p class="text-lg font-bold">
        Total: $${order.total}
      </p>

    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const renderOrders = () => {
  const status = statusFilter.value;

  const filteredOrders = orders
    .filter((order) => (status === "ALL" ? true : order.estado === status))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  ordersContainer.innerHTML = filteredOrders
    .map(
      (order) => `
      <article
        class="order-card cursor-pointer rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
        data-id="${order.id}"
      >
        <div class="mb-4 flex items-center justify-between">

          <h3 class="text-xl font-bold">
            Pedido #${order.id}
          </h3>

          <span
            class="rounded-full px-3 py-1 text-sm font-semibold ${
              STATUS_COLOR[order.estado]
            }"
          >
            ${order.estado}
          </span>

        </div>

        <div class="space-y-1 text-gray-700">
          <p>
            <strong>Cliente:</strong>
            ${getUserName(order.idUsuario)}
          </p>

          <p>
            <strong>Fecha:</strong>
            ${formatDate(order.fecha)}
          </p>

          <p>
            <strong>Productos:</strong>
            ${order.detalles.length}
          </p>

          <p class="font-semibold">
            Total: $${order.total}
          </p>
        </div>
      </article>
    `,
    )
    .join("");

  document.querySelectorAll(".order-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number((card as HTMLElement).dataset.id);

      const order = orders.find((o) => o.id === id);

      if (order) {
        openModal(order);
      }
    });
  });
};

statusFilter.addEventListener("change", renderOrders);

closeModal.addEventListener("click", () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
});

const init = async () => {
  const result = await Promise.all([getOrders(), getUsers()]);

  orders = result[0];
  users = result[1];

  renderOrders();
};

init();
