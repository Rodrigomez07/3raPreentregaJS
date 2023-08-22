console.log(productos)

const containerCards = document.querySelector(".container-cards")

const cardsAHtml = array => {

    // generar la lógica que desarrolle las tarjetas (nodos html)

    const cards = array.reduce((acc, element) => {
        return acc + `
        <div class="card" id="card-${element.id}">
            <button class="button-card" id="button-${element.id}">
                <i class="fa-solid fa-star"></i>
            </button>       
            <h2>
                ${element.producto}
            </h2>
            <figure class="container-card">
                <img src=${element.imagen || "not-found.jpg"} alt="imagen de ${element.producto}">
            </figure>
            <h6>
                Marca: ${element.marca}
            </h6>
            <h4>
                Precio: ${element.precio}
            </h4>
            <h6>
                ${element.descripcion}
            </h6>
            
        </div>
    `
    }, "")

    // generar que se impacten estas tarjetas en el DOM con innerHTML
    containerCards.innerHTML = cards

}

cardsAHtml(productos)

const allCards = document.querySelectorAll(".button-card")
console.log(allCards)

let productosCarrito = []

 const eventoCards = ( nodos, array ) => {

     for ( let i = 0; i < nodos.length; i++ ) {

         nodos[i].onclick = (e) => {                               
             const id = e.currentTarget.id.slice(7)
             const buscarProducto = array.find( element => element.id === Number(id))
             productosCarrito.push(buscarProducto)
             localStorage.setItem("productos", JSON.stringify(productosCarrito))
             Toastify({
                 text: `Se ha añadido  ${ buscarPokemon.name } al carrito de compras.`,
                 className: "info",
                 style: {
                     background: "linear-gradient(to right, #00b09b, #96c93d)",
                 }
             }).showToast();
         }
     }
 }

 eventoCards(allCards, productos)