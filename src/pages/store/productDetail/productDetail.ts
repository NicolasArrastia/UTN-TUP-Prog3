import { mountStoreHeader } from "../../../components/storeHeader";
import { getProducts } from "../../../utils/api";
import { logout } from "../../../utils/auth";
import { addToCart } from "../../../utils/cart";
import { ROUTES } from "../../../utils/navigate";
import { updateCartBadge } from "../../../utils/updateCartBadge";

mountStoreHeader();

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const productImage = document.getElementById(
  "productImage",
) as HTMLImageElement;
const productName = document.getElementById("productName")!;
const productDescription = document.getElementById("productDescription")!;
const productPrice = document.getElementById("productPrice")!;
const productStock = document.getElementById("productStock")!;
const productStatus = document.getElementById("productStatus")!;
const quantityInput = document.getElementById(
  "quantityInput",
) as HTMLInputElement;
const addToCartButton = document.getElementById(
  "addToCartButton",
) as HTMLButtonElement;
const feedbackMessage = document.getElementById("feedbackMessage")!;
const backButton = document.getElementById("backButton")!;
const logoutButton = document.getElementById("logoutButton")!;

const loadProduct = async () => {
  const products = await getProducts();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    window.location.href = ROUTES.HOME;
    return;
  }

  productImage.src = product.imagen;
  productImage.alt = product.nombre;

  productName.textContent = product.nombre;
  productDescription.textContent = product.descripcion;
  productPrice.textContent = product.precio.toFixed(2);
  productStock.textContent = String(product.stock);

  quantityInput.max = String(product.stock);

  if (product.eliminado) {
    productStatus.textContent = "Producto eliminado";
    productStatus.className =
      "mb-3 w-fit rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700";

    quantityInput.disabled = true;
    addToCartButton.disabled = true;
  } else if (!product.disponible || product.stock === 0) {
    productStatus.textContent = "No disponible";
    productStatus.className =
      "mb-3 w-fit rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700";

    quantityInput.disabled = true;
    addToCartButton.disabled = true;
  } else {
    productStatus.textContent = "Disponible";
    productStatus.className =
      "mb-3 w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700";
  }

  addToCartButton.addEventListener("click", () => {
    if (product.eliminado || !product.disponible || product.stock === 0) {
      return;
    }

    const quantity = Number(quantityInput.value);

    if (quantity < 1 || quantity > product.stock) {
      alert("Cantidad inválida.");
      return;
    }

    addToCart(product, quantity);
    updateCartBadge();

    feedbackMessage.textContent = "Producto agregado al carrito.";
  });
};

backButton.addEventListener("click", () => {
  window.location.href = ROUTES.HOME;
});

logoutButton.addEventListener("click", logout);

updateCartBadge();
loadProduct();
