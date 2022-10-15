import { Pieza } from "./pieza.class.js";
import { actualizarBudge } from "./funciones.js";

// Variables Locales
let arrayPiezas = [];
let arrayCarrito = [];

const $listaProductos = document.getElementById('listado');
const input = document.querySelector('#buscador input');
const budge = document.querySelector('.budge');

// Funciones

/**
 * Funcion para traer los datos de la "BBDD"
 */
const getProducts = async () => {

    try {

        let data = await fetch("./piezas.json");
        arrayPiezas = await data.json();

    } catch (error) {

        console.log(error)
    }

    generarCards(arrayPiezas)
}

/**
 * Funcion para pintar las cards de las piezas en el main
 */
const generarCards = (array) => {
    array.forEach((item) => {

        let {id, nombre, categoria, precio, img, fondo} = item;
        
        $listaProductos.innerHTML += `
            <div class="card ${fondo}">
                <img src=${img} alt="">
                <div class="card_info">
                    <h3>Pieza: ${nombre}</h3>
                    <p>Categoria: ${categoria}</p>
                    <p>Precio: $ ${precio}</p>
                    <button id="btnAgregar" class="btn btn-outline-primary btn-sm" data-id=${id}>add</button>
                </div>
            </div>`
    })
}

/**
 * Funcion para filtrar el array de Piezas segun el string que le vaya pasando como parametro
 * @param {string} busqueda 
 */
const filtrar = (busqueda)=> {
    let filtrados = arrayPiezas.filter((item)=> item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || item.categoria.toLowerCase().includes(busqueda.toLowerCase()));
    
    if (filtrados.length > 0){
        $listaProductos.innerHTML = ``;
        generarCards(filtrados)
    }else{
        $listaProductos.innerHTML = `
            <div class="text-center py-5 text-danger">
            <h1> Oooooops.... </h1>
            <h2> No hay coincidencias </h2>
            </div>`;
    }
}

// Programa
document.addEventListener('DOMContentLoaded', ()=> {

    getProducts();

    let carritoAux = JSON.parse( localStorage.getItem('carrito') );
    if (carritoAux != null) {
        arrayCarrito = [...carritoAux];
    }

    actualizarBudge( arrayCarrito, budge );

    
    // eventListener para el input de busqueda
    document.addEventListener("input", (e)=>{

        filtrar(e.target.value)
    })
    
    // eventListener para el click de los botones
    document.addEventListener("click", (e)=> {
        
        if (e.target.matches('#btnAgregar')){
            
            let idPieza = parseInt(e.target.attributes[2].value);
            let yaExiste = arrayCarrito.findIndex( item => item.id == idPieza )
            
            if ( yaExiste !== -1 ) {
                // Entra aca si ya existe en el carrito (-1 = no existe)
                let pieza = arrayCarrito[yaExiste];


                // Aca me da error si refresco la pagina y quiero agregar una pieza que ya tengo en el carrito
                pieza.sumarCantidad();
                
            } else {               
                let resultado = arrayPiezas.find( pieza => pieza.id === idPieza );
                
                let piezaAdd = new Pieza(resultado.id, resultado.nombre, resultado.categoria, resultado.precio, resultado.img, resultado.fondo);
                arrayCarrito.push(piezaAdd);                
            }
            
            // Hago aparecer el budge del carrito para mostrar la cantidad de prod.
            actualizarBudge(arrayCarrito, budge)
            
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
        }

        if (e.target.matches('.cart')){

            console.log('btn carrito')
        }
    })
})