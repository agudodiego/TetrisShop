export class Pieza {
    
    constructor(id, nombre, categoria, precio, img, fondo, cantidad = 1){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.precio = precio,
        this.img = img,
        this.fondo = fondo,
        this.cantidad = cantidad
    }

    sumarCantidad() {
        this.cantidad++;
    }

    restarCantidad() {
        this.cantidad--;
    }
}