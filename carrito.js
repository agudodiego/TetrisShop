import { actualizarBudge, generarListado, actualizarTabla } from "./funciones.js";
import { Pieza } from "./pieza.class.js";

// Variables Locales
const $budge = document.querySelector('.budge');
const $main = document.getElementById('main');
const $cuerpoLista = document.getElementById('cuerpoLista');
const $total = document.getElementById('total');
const $modGracias = document.getElementById('modGracias');
const $btnClose = document.getElementById('btnClose');
const $cart = document.querySelector('.cart');

// Programa
document.addEventListener('DOMContentLoaded', () => {

    let arrayCarrito = [];
    let carritoAux = JSON.parse(localStorage.getItem('carrito'));

    if (carritoAux != null) {
        arrayCarrito = carritoAux.map((prod)=>{
            return new Pieza( prod.id, prod.nombre, prod.categoria, prod.precio, prod.img, prod.fondo, prod.cantidad )
        });
    }

    if (arrayCarrito != null && arrayCarrito.length > 0) {

        $cart.classList.remove("opacity");

        actualizarBudge(arrayCarrito, $budge);

        generarListado(arrayCarrito, $cuerpoLista, $total);

    } else {
        $main.innerHTML = `
            <h1> Todavia no hay nada en el carrito... </h1>
        `;
    }

    // eventListener para el click de los botones
    document.addEventListener("click", (e)=> {
        
        // Boton cancelar
        if (e.target.matches('#btnCancelar')){
            arrayCarrito = [];
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
            window.location.assign("./index.html")
        }
        
        // Boton continuar
        if (e.target.matches('#btnContinuar')){
            $modGracias.classList.toggle("hidden");
        }
        
        // Boton close
        if (e.target.matches('#btnClose')){
            arrayCarrito = [];
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
            window.location.assign("./index.html")
            $modGracias.classList.toggle("hidden");
        }
        
        // Boton sumar
        if (e.target.matches('#btnSumar')){
            let idPieza = parseInt(e.target.attributes[2].value);
            let index = arrayCarrito.findIndex( item => item.id == idPieza );
            
            let pieza = arrayCarrito[index];
            pieza.sumarCantidad();
            arrayCarrito.splice(index,1,pieza);

            actualizarTabla(arrayCarrito, $budge, $cuerpoLista, $total);
        }
        
        // Boton restar
        if (e.target.matches('#btnRestar')){
            let idPieza = parseInt(e.target.attributes[2].value);
            let index = arrayCarrito.findIndex( item => item.id == idPieza );

            let pieza = arrayCarrito[index];
            if (pieza.cantidad > 1) {

                pieza.restarCantidad();
                arrayCarrito.splice(index,1,pieza);

                actualizarTabla(arrayCarrito, $budge, $cuerpoLista, $total);

            }else{

                arrayCarrito.splice(index,1);

                actualizarTabla(arrayCarrito, $budge, $cuerpoLista, $total);
    
                window.location.assign("./carrito.html")
            }
        }
    })
})