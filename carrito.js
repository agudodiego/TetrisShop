import { actualizarBudge } from "./funciones.js";
import { generarListado } from "./funciones.js";

// Variables Locales
const $budge = document.querySelector('.budge');
const $main = document.getElementById('main');
const $cuerpoLista = document.getElementById('cuerpoLista');
const $total = document.getElementById('total');

// Programa
document.addEventListener('DOMContentLoaded', () => {

    let arrayCarrito = JSON.parse(localStorage.getItem('carrito'));
    if (arrayCarrito != null) {

        actualizarBudge(arrayCarrito, $budge);

        generarListado(arrayCarrito, $cuerpoLista, $total);

    } else {
        $main.innerHTML = `
            <h1> Todavia no hay nada en el carrito... </h1>
        `;
    }
})