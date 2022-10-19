export let arrayPiezas = [];

/**
 * Funcion para traer los datos de la "BBDD"
 * @param {HTMLElement} elementoHtml - elemento en el que se pintaran los productos
 */
 export const getProducts = async (elementoHtml) => {
    try {

        let data = await fetch("./piezas.json");
        arrayPiezas = await data.json();

    } catch (error) {

        console.log(error)
    }

    generarCards(arrayPiezas, elementoHtml);
}

/**
 * Funcion para controlar si el carrito tiene productos y mostrar esa cantidad en el budge
 * @param {array} array 
 * @param {HTMLElement} elementoHtml - elemento donde se pinta la cantidad
 */
export const actualizarBudge = (array, elementoHtml) => {

    if (array != null && array.length > 0) {
        elementoHtml.classList.remove('hidden');       
    
        elementoHtml.innerHTML = array.reduce((ac, item)=>  ac + item.cantidad , 0);
    }
}

/**
 * Funcion para generar la lista de productos agregados al carrito
 * Tambien genera el gasto total
 * @param {array} array 
 * @param {HTMLElement} elementoHtml1 - div donde se pinta la lista 
 * @param {HTMLElement} elementoHtml2 - div donde se pinta el precio total
 */
export const generarListado = (array, elementoHtml1, elementoHtml2) => {

    let acumulador = 0;

    array.forEach(item => {

        let { id, nombre, precio, img, cantidad } = item;

        elementoHtml1.innerHTML += `
            <tr>                
                <td><img src="${img}" style="width: 60px" alt=""></td>
                <td class="nomPieza">${nombre}</td>
                <td>
                    <button id="btnSumar" class="btn btn-dark btn-sm mx-1" data-id=${id}>+</button>
                    ${cantidad}
                    <button id="btnRestar" class="btn btn-dark btn-sm mx-1" data-id=${id}>-</button>
                </td>
                <td>${precio}</td>
                <td>${precio * cantidad}</td>
            </tr>
        `;

        acumulador += precio * cantidad;
        
    });

    elementoHtml2.innerHTML += `Total de la compra: $ ${acumulador}`;
}

/**
 * Funcion para pintar las cards de las piezas en el <main>
 * @param {array} array - array con los productos a pintar
 * @param {HTMLElement} elementoHtml1 - div donde se pinta la lista
 */
 export const generarCards = (array, elementoHtml1) => {
    array.forEach((item) => {

        let {id, nombre, categoria, precio, img, fondo} = item;
        
        elementoHtml1.innerHTML += `
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
 * @param {string} busqueda - termino de busqueda
 * @param {array} array - array con las piezas en donde buscar
 * @param {HTMLElement} elementoHtml - div donde se pinta el error
 */
export const filtrar = (busqueda, array, elementoHtml)=> {
    let filtrados = array.filter((item)=> item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || item.categoria.toLowerCase().includes(busqueda.toLowerCase()));
    
    if (filtrados.length > 0){
        elementoHtml.innerHTML = ``;
        generarCards(filtrados, elementoHtml)
    }else{
        elementoHtml.innerHTML = `
            <div class="text-center py-5 text-danger">
            <h1> Oooooops.... </h1>
            <h2> No hay coincidencias </h2>
            </div>`;
    }
}

/**
 * Funcion para actualizar la tabla con productos del carrito desde la botonera de la misma tabla
 * @param {array} array - array con las piezas a pintar
 * @param {HTMLElement} elementoHtml1 - budge donde se muestra el numero del carrito
 * @param {HTMLElement} elementoHtml2 - div donde se pinta el cuerpo de la lista
 * @param {HTMLElement} elementoHtml3 - div donde se pinta el precio total
 */
export const actualizarTabla = (array, elementoHtml1, elementoHtml2, elementoHtml3)=> {
    actualizarBudge(array, elementoHtml1);
    elementoHtml2.innerHTML = "";
    elementoHtml3.innerHTML = "";
    generarListado(array, elementoHtml2, elementoHtml3);
    localStorage.setItem("carrito", JSON.stringify(array));
}