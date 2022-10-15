
/**
 * Funcion para controlar si el carrito tiene productos y mostrar esa cantidad en el budge
 * @param {array} array 
 * @param {HTMLElement} elementoHtml 
 */
export const actualizarBudge = (array, elementoHtml) => {

    if (array != null && array.length > 0) {
        elementoHtml.classList.remove('hidden');
        let acumulador = 0;
        for (const item of array) { acumulador += item.cantidad };
        elementoHtml.innerHTML = acumulador;
    }
}

/**
 * Funcion para generar la lista de productos agregados al carrito
 * Tambien genera el gasto total
 * @param {array} array 
 * @param {HTMLElement} elementoHtml1 
 * @param {HTMLElement} elementoHtml2 
 */
export const generarListado = (array, elementoHtml1, elementoHtml2) => {

    let acumulador = 0;

    array.forEach(item => {

        let { nombre, precio, img, cantidad } = item;

        elementoHtml1.innerHTML += `
            <tr>                
                <td><img src="${img}" style="width: 60px" alt=""></td>
                <td>${nombre}</td>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td>${precio * cantidad}</td>
            </tr>
        `;

        acumulador += precio * cantidad;
        
    });

    elementoHtml2.innerHTML += `Total de la compra: $ ${acumulador}`;
}