import { Pieza } from "./pieza.class.js";
import { actualizarBudge, filtrar, generarCards, getProducts, arrayPiezas } from "./funciones.js";

// Variables Locales
let arrayCarrito = [];

const $listaProductos = document.getElementById('listado');
const input = document.querySelector('#buscador input');
const $budge = document.querySelector('.budge');
const $cart = document.querySelector('.cart');

// Programa
document.addEventListener('DOMContentLoaded', () => {

  getProducts($listaProductos);

  let carritoAux = JSON.parse(localStorage.getItem('carrito'));
  if (carritoAux != null) {
    // Debo inicializar las instancias cada elemento del carrito ya que localStorage no recupera los metodos de la clase
    arrayCarrito = carritoAux.map((prod) => {
      return new Pieza(prod.id, prod.nombre, prod.categoria, prod.precio, prod.img, prod.fondo, prod.cantidad)
    });

    if (arrayCarrito.length = 0){
      $cart.classList.remove("opacity");
    }
  }

  actualizarBudge(arrayCarrito, $budge);

  // eventListener para el input de busqueda
  document.addEventListener("input", (e) => {
    let busqueda = e.target.value;
    filtrar(busqueda, arrayPiezas, $listaProductos)
  })

  // eventListener para el click de los botones
  document.addEventListener("click", (e) => {

    if (e.target.matches('#btnAgregar')) {

      let idPieza = parseInt(e.target.attributes[2].value);
      let yaExiste = arrayCarrito.findIndex(item => item.id == idPieza)

      $cart.classList.remove("opacity");

      if (yaExiste !== -1) {
        // Entra aca si ya existe en el carrito (-1 = no existe)
        let pieza = arrayCarrito[yaExiste];

        pieza.sumarCantidad();

      } else {
        let resultado = arrayPiezas.find(pieza => pieza.id === idPieza);

        let piezaAdd = new Pieza(resultado.id, resultado.nombre, resultado.categoria, resultado.precio, resultado.img, resultado.fondo);
        arrayCarrito.push(piezaAdd);
      }

      // Hago aparecer el budge del carrito para mostrar la cantidad de productos.
      actualizarBudge(arrayCarrito, $budge)

      localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
    }
  })
})