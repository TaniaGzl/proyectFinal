let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

document.addEventListener("DOMContentLoaded", function () {
    const contenidoHome = document.getElementById("contenidoHome");
    const aboutUsSection = document.getElementById("aboutUsSection");
    const contenedorProductos = document.getElementById("contenedor-productos");
    const contenidoContact = document.getElementById("contenidoContact");  // Agregado

    // Mostrar contenido inicial
    contenidoHome.style.display = "block";
    aboutUsSection.style.display = "none";
    contenedorProductos.style.display = "none";
    contenidoContact.style.display = "none";  // Agregado

    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const contactBtn = document.getElementById("contactBtn");  // Agregado

    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {

            contenidoHome.style.display = "none";
            aboutUsSection.style.display = "none";
            contenedorProductos.style.display = "none";
            contenidoContact.style.display = "none";  // Agregado

            if (e.currentTarget.id === "homeBtn") {
                contenidoHome.style.display = "block";
            } else if (e.currentTarget.id === "aboutUsBtn") {
                aboutUsSection.style.display = "block";
            } else if (e.currentTarget.id === "todosBtn") {
                contenedorProductos.style.display = "grid";
                contenedorProductos.style.gridAutoFlow = "row"; // Otras propiedades CSS que desees agregar
            }
        });
    });

    contactBtn.addEventListener("click", () => {  // Agregado
        contenidoContact.style.display = "block";
        contenidoHome.style.display = "none";
        aboutUsSection.style.display = "none";
        contenedorProductos.style.display = "none";
    });
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Obtén todos los botones con la clase 'boton-menu'
const botonesMenu = document.querySelectorAll('.boton-menu');

// Agrega un evento de clic a cada botón
botonesMenu.forEach(boton => {
  boton.addEventListener('click', function() {
    // Elimina la clase 'active' de todos los botones
    botonesMenu.forEach(b => b.classList.remove('active'));

    // Agrega la clase 'active' solo al botón clicado
    this.classList.add('active');
  });
});
