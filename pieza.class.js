export class Pieza {

    constructor(id, nombre, categoria, precio, img, fondo){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.precio = precio,
        this.img = img,
        this.fondo = fondo,
        this.cantidad = 1
    }

    sumarCantidad() {
        return this.cantidad++;
    }
}