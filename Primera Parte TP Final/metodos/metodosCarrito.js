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
        console.log(nuevoCarrito);
        
        const carritoCompleto = await carrito.create(nuevoCarrito);
        return nuevoCarrito;
   
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

exports.addProductToCart = async function (req, res) {
    const { idCart } = req.params;
    const { body } = req;
    console.log(idCart);
    if(idCart){
        const carritoElegido = carritoArray.find((item) => item.id == idCart);
        console.log(carritoElegido);
        if (carritoElegido) {
            //update
            body.id = carritoElegido.productos.length + 1;
            body.timestamp = Date.now();
            carritoElegido.productos.push(body);
            console.log(carritoElegido);
            const carritoCompleto = await carrito.update(idCart, carritoElegido);
            return carritoCompleto;
        }
        return { error: 'Carrito no encontrado' };
    }
};
exports.findCartProducts = async function (req, res) {
    const { idCart } = req.params;
    const { idProduct } = req.params;

    if(idCart){
        const carrito = carritoArray.find((item) => item.id == idCart);
        if (carrito) {
            const producto = carrito.productos.filter((item) => item.id == idProduct);
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

