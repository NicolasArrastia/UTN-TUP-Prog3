import { Order } from "../../../types/order";
import { getSessionUser } from "../../../utils/auth";
import { getOrdersByUser } from "../../../utils/orders";

const ordersList = document.getElementById("ordersList") as HTMLElement;
const emptyState = document.getElementById("emptyState") as HTMLElement;

const modal = document.getElementById("orderModal") as HTMLElement;
const modalBody = document.getElementById("modalBody") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;
const closeModal = document.getElementById("closeModal") as HTMLButtonElement;

const user = getSessionUser();

const STATUS_COLOR: Record<string, string> = {
  PENDIENTE: "badge-yellow",
  CONFIRMADO: "badge-blue",
  TERMINADO: "badge-green",
  CANCELADO: "badge-red",
};

const formatDate = (date: string) => new Date(date).toLocaleDateString("es-AR");

const openModal = (order: Order) => {
  modalTitle.textContent = `Pedido #${order.id}`;

  modalBody.innerHTML = `
    <p><strong>Estado:</strong> ${order.estado}</p>
    <p><strong>Fecha:</strong> ${formatDate(order.fecha)}</p>
    <p><strong>Forma de pago:</strong> ${order.formaPago}</p>

    <hr />

    <ul>
      ${order.detalles
        .map(
          (d) => `
        <li>
          Producto ID: ${d.idProducto} | Cantidad: ${d.cantidad} | Subtotal: $${d.subtotal}
        </li>
      `,
        )
        .join("")}
    </ul>

    <hr />

    <p><strong>Total:</strong> $${order.total}</p>
  `;

  modal.classList.remove("hidden");
};

const renderOrders = (orders: Order[]) => {
  if (orders.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (o) => `
      <div class="order-card" data-id="${o.id}">
        <div class="order-header">
          <span>#${o.id}</span>
          <span class="badge ${STATUS_COLOR[o.estado]}">${o.estado}</span>
        </div>

        <div class="order-body">
          <p>${formatDate(o.fecha)}</p>
          <p>${o.detalles
            .slice(0, 3)
            .map((d) => `Prod ${d.idProducto}`)
            .join(", ")}</p>
          <p>Total: $${o.total}</p>
        </div>
      </div>
    `,
    )
    .join("");

  document.querySelectorAll(".order-card").forEach((card) => {
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
});

init();
