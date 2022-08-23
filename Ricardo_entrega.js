

class Producto {
    constructor(nombre, marca, precio, stock, ) {
        this.nombre = nombre
        this.marca = marca
        this.precio = precio
        this.stock = stock
        
    }
}

let productos = []

if(localStorage.getItem('productos')) { //String si existe / NULL si no existe
    productos =  JSON.parse(localStorage.getItem('productos')) //JSON.parse() pasa de JSON a objeto
} else {
    localStorage.setItem('productos', JSON.stringify(productos)) //JSON.stringify() pasar de objeto a JSON
}

const idForm = document.getElementById("idForm")
const botonproduc = document.getElementById("botonproduc")
const divProductos = document.getElementById("divProductos")

//const productos = []

idForm.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const datForm = new FormData(evento.target)


    const producto = new Producto (datForm.get("nombre"), datForm.get("marca"), datForm.get("precio"), datForm.get("stock"))

    productos.push(producto)

    localStorage.setItem('productos', JSON.stringify(productos))

    idForm.reset()
    console.log(producto) // me permite corroborar que si se inserte informacion
})


botonproduc.addEventListener('click', () => {
    const tarStorage = JSON.parse(localStorage.getItem('productos'))

    divProductos.innerHTML = ""

    tarStorage.forEach((producto, indice) => {
        divProductos.innerHTML += `
        <div class="card bg-light mb-3" id="producto${indice}" style="max-width: 18rem;margin:3px;">
        <div class="card-header"><h2>${producto.nombre}<h2></div>
            <div class="card-body">       
                <p class="card-text">Marca: ${producto.marca}</p>
                <p class="card-text">Precio: $${producto.precio}</p>
                <p class="card-text">Stock: ${producto.stock}</p>
                <button class="btn btn-danger">Eliminar</button>
                
        </div>
      </div>
        `
        
    }) 


    tarStorage.forEach((producto, indice) => {
        const tarjetaProducto = document.getElementById(`producto${indice}`)

        tarjetaProducto.children[1].children[3].addEventListener('click', () => {
            tarjetaProducto.remove() //remover del DOM
            productos.splice(indice, 1) //Quitar el Array
            localStorage.setItem('productos', JSON.stringify(productos)) //remover del localStorage
            console.log(`${producto.nombre} Eliminada`)
        })
    })
}) 
