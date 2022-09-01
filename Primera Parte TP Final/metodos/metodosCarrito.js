const clases = require('../clases');
let carrito = new clases('carrito.json');

let carritoArray = [];

let obtenerCarrito = async function () {
    carritoArray = await carrito.getAll();
};

obtenerCarrito();


    
exports.createCart = async function (req, res) {
    await obtenerCarrito();
    // ASIGNARLE UN ID AL OBJETO
    let nuevoCarrito = { 
        id: 0,
         timestamp: 0
        };
  
        nuevoCarrito.id = carritoArray.length + 1;
        nuevoCarrito.timestamp = Date.now();
  
    ingresarNuevoObj(newCart);
    return newCart;
    //console.log(arrayCompleto.length);
  };

exports.findCarrito = async function (req, res) {
    const { id } = req.params;
    const carrito = carritoArray.find((item) => item.id == id);
    if (carrito) {
        return carrito;
    }
    return { error: 'Producto no encontrado' };
};

exports.deleteCarrito = async function (req, res) {
    const { id } = req.params;
    obtenerCarrito();
    carritoArray = carritoArray.filter((item) => item.id != id);
    return carritoArray;
    
};

exports.addProductToCart = async function (req, res, addProduct) {
    const { id } = req.params;
    if(id){
        const carrito = carritoArray.find((item) => item.id == id);
        if (carrito) {
            carrito.productos.push(addProduct);
            return carrito;
        }
        return { error: 'Carrito no encontrado' };
    }
};
exports.findCartProducts = async function (req, res) {
    const { id } = req.params;
    const { idProduct } = req.params;
    if(id){
        const carrito = carritoArray.find((item) => item.id == id);
        if (carrito) {
            const producto = carrito.productos.find((item) => item.id == idProduct);
            if (producto) {
                return producto;
            }
            return { error: 'Producto no encontrado' };
        }
        return { error: 'Carrito no encontrado' };
    }
};
exports.deleteProductFromCart = async function (req, res, deleteProduct) {
    const { id } = req.params;
    if(id){
        const carrito = carritoArray.find((item) => item.id == id);
        if (carrito) {
            carrito.productos = carrito.productos.filter((item) => item.id != deleteProduct);
            return carrito;
        }
        return { error: 'Carrito no encontrado' };
    }
};

exports.ingresarNuevoObj = async function (req, res) {
    const { body } = req;
    const product = await carrito.create(body);
    return body;
};

