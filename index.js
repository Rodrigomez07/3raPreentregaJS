import { productos } from './productos.js';

const containerCards = document.querySelector(".container-cards");
const feedbackMessage = document.getElementById("feedback-message");
const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

function updateCartTotal() {
    const totalElement = document.querySelector(".cart-total");
    const total = productosCarrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function showFeedbackMessage(message, type = "success") {
    feedbackMessage.textContent = message;
    feedbackMessage.classList.add(type);

    setTimeout(() => {
        feedbackMessage.textContent = "";
        feedbackMessage.classList.remove(type);
    }, 3000);
}

function generateProductCards(array) {
    const cards = array.map(element => `
        <div class="card" id="card-${element.id}">
            <h2>${element.producto}</h2>
            <figure class="container-card">
                <img src=${element.imagen || "not-found.jpg"} alt="imagen de ${element.producto}">
            </figure>
            <h6>Marca: ${element.marca}</h6>
            <h4>Precio: ${element.precio}</h4>
            <button class="button-card" id="button-${element.id}">
                Agregar al carrito
            </button>
            <h6>${element.descripcion}</h6>
        </div>
    `).join("");

    containerCards.innerHTML = cards;

    const allCards = document.querySelectorAll(".button-card");
    allCards.forEach(card => {
        card.addEventListener("click", (e) => {
            const id = e.currentTarget.id.slice(7);
            const buscarProducto = array.find(element => element.id === Number(id));

            if (!productosCarrito.some(producto => producto.id === Number(id))) {
                productosCarrito.push(buscarProducto);
                localStorage.setItem("productos", JSON.stringify(productosCarrito));
                showFeedbackMessage(`Se ha añadido ${buscarProducto.producto} al carrito de compras.`, "success");
                updateCartTotal();
            } else {
                showFeedbackMessage(`El producto ya está en el carrito.`, "error");
            }
        });
    });
}

window.addEventListener("load", () => {
    generateProductCards(productos);
});
