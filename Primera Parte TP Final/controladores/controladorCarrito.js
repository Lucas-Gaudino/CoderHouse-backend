const metodoCarrito = require('../metodos/metodosCarrito');

exports.createCart = async function (req, res) {
    const carritoNuevo = await metodoCarrito.createCart(req, res);
    res.send({ message: "Creation OK", cartAdded: carritoNuevo });
};

exports.deleteProductFromCart = async function (req, res, deleteProduct) {
    const carrito = await metodoCarrito.deleteProductFromCart(req, res, deleteProduct);
    res.send({ message: "Delete OK", cart: carrito });
};

exports.findCartProducts = async function (req, res) {
    const producto = await metodoCarrito.findCartProducts(req, res);
    res.send({ message: producto, productList: productList });
};
exports.findCart = async function(req, res) {
    const carrito = await metodoCarrito.findCarrito(req, res);
    res.send({ message: carrito, cartList: carrito });
};

exports.deleteCart = async function(req, res) {
    const cartList = await metodoCarrito.deleteCarrito(req, res);
    res.send({ message: "Delete OK", cartList: cartList });
};

exports.addProductToCart = async function (req, res, addProduct) {
    const carrito = await metodoCarrito.addProductToCart(req, res, addProduct);
    res.send({ message: carrito, cartList: carrito });
};

exports.showCart = async function (req, res) {
    const carrito = await metodoCarrito.showCart(req, res);
    res.send({ message: carrito, cartList: carrito });
};