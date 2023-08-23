import { productos } from './productos.js';

const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

function showFeedbackMessage(message, type = "success") {
    Toastify({
        text: message,
        className: type,
        style: {
            background: type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "#ff4136",
        }
    }).showToast();
}

function updateCartTotal() {
    const totalElement = document.querySelector(".cart-total");
    const total = productosCarrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function generateCartProductCards(array) {
    const containerCards = document.querySelector(".container-cards");

    const cards = array.map(element => `
        <div class="card" id="card-${element.id}">
            <h2>${element.producto}</h2>
            <figure class="container-card">
                <img src=${element.imagen || "not-found.jpg"} alt="imagen de ${element.producto}">
            </figure>
            <h6>Marca: ${element.marca}</h6>
            <h4>Precio: ${element.precio}</h4>
            <button class=".button-remove" data-id="${element.id}">
                Eliminar
            </button>
        </div>
    `).join("");

    containerCards.innerHTML = cards;

    const allRemoveButtons = document.querySelectorAll(".button-remove");
    allRemoveButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            productosCarrito = productosCarrito.filter(producto => producto.id !== Number(id));
            localStorage.setItem("productos", JSON.stringify(productosCarrito));
            updateCartTotal();

            // Actualiza la visualización del carrito después de eliminar
            generateCartProductCards(productosCarrito);

            showFeedbackMessage(`Se ha eliminado un producto del carrito.`);
        });
    });
}

window.addEventListener("load", () => {
    updateCartTotal();
    generateCartProductCards(productosCarrito);
});
