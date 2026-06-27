import { mountStoreHeader } from "../../../components/storeHeader";
import { Order } from "../../../types/order";
import { getSessionUser } from "../../../utils/auth";
import { getOrdersByUser } from "../../../utils/orders";

mountStoreHeader();

const ordersList = document.getElementById("ordersList") as HTMLElement;
const emptyState = document.getElementById("emptyState") as HTMLElement;

const modal = document.getElementById("orderModal") as HTMLElement;
const modalBody = document.getElementById("modalBody") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;
const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

const user = getSessionUser();

const STATUS_COLOR: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800",
  CONFIRMADO: "bg-blue-100 text-blue-800",
  TERMINADO: "bg-green-100 text-green-800",
  CANCELADO: "bg-red-100 text-red-800",
};

const formatDate = (date: string) => new Date(date).toLocaleDateString("es-AR");

const openModal = (order: Order) => {
  modalTitle.textContent = `Pedido #${order.id}`;

  modalBody.innerHTML = `
    <div class="space-y-2 text-gray-700">
      <p><strong>Estado:</strong> ${order.estado}</p>
      <p><strong>Fecha:</strong> ${formatDate(order.fecha)}</p>
      <p><strong>Forma de pago:</strong> ${order.formaPago}</p>

      <hr class="my-3" />

      <ul class="space-y-2 text-sm">
        ${order.detalles
          .map(
            (d) => `
            <li class="flex justify-between border-b pb-1">
              <span>Producto ${d.idProducto}</span>
              <span>x${d.cantidad}</span>
              <span>$${d.subtotal}</span>
            </li>
          `,
          )
          .join("")}
      </ul>

      <hr class="my-3" />

      <p class="text-right font-bold text-lg">
        Total: $${order.total}
      </p>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const renderOrders = (orders: Order[]) => {
  if (orders.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (o) => `
      <div
        data-id="${o.id}"
        class="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <span class="font-semibold text-gray-800">#${o.id}</span>

          <span class="rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_COLOR[o.estado]
          }">
            ${o.estado}
          </span>
        </div>

        <div class="mt-3 space-y-1 text-sm text-gray-600">
          <p>${formatDate(o.fecha)}</p>

          <p class="truncate">
            ${o.detalles
              .slice(0, 3)
              .map((d) => `Prod ${d.idProducto}`)
              .join(", ")}
          </p>

          <p class="font-semibold text-gray-800">
            Total: $${o.total}
          </p>
        </div>
      </div>
    `,
    )
    .join("");

  document.querySelectorAll("[data-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number((card as HTMLElement).dataset.id);
      const order = orders.find((o) => o.id === id);
      if (order) openModal(order);
    });
  });
};

const init = async () => {
  if (!user) return (window.location.href = "/src/pages/auth/login/index.html");

  const orders = await getOrdersByUser(user.id);
  renderOrders(orders);
};

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

init();
