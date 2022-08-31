const metodoProducto = require('../metodos/metodoProducto.js');

// //EXPORTAMOS LO QUE QUEREMOS QUE HAGA LA PÁGINA



exports.createProducts = async function (req, res) {

    const productoNuevo = await metodoProducto.createProducts(req, res);
    res.send({ message: "Creation OK", productAdded: productoNuevo });
};

exports.updateProducts = async function (req, res) {
    const product = await metodoProducto.updateProducts(req, res);
    res.send({ message: "Editation OK", productEditted: product });
};

exports.deleteProducts = async function(req, res) {
    const productList = await metodoProducto.deleteProducts(req, res);
    res.send({ message: "Delete OK", productList: productList });
};

exports.findCartProducts = async function(req, res) {
    const product = await metodoProducto.findCartProducts(req, res);
    console.log("Producto desde el server: "+ product);
    
    res.send({ message: product, productList: product });
};