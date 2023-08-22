const productosLs = JSON.parse(localStorage.getItem("productos"))
const containerCards = document.querySelector("div")

const cardsAHtml = array => {

    // generar la lógica que desarrolle las tarjetas (nodos html)

    const cards = array.reduce((acc, element) => {
        return acc + `
        <div class="card" id="card-${element.id}">
                  
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

cardsAHtml(productosLs)