const express = require('express');
const {carritoDaos: Carrito} = require('../Daos/mainDaos');
const routerCarrito = express.Router();

const Carro = new Carrito();

routerCarrito.post('/', async function(req, res){
    try {
        const carrito = await Carro.newCarrito();
        res.status(201).send({
            status: 'ok',
            data: { 
                carrito: carrito
            },
            message: 'Carrito creado'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

routerCarrito.delete('/carrito/:id', async function(req, res){
    try {
        const carrito = await Carro.deleteCarrito(req.params.id);
        res.status(200).send({
            status: 'ok',
            data: { 
                carrito: carrito
            },
            message: 'Carrito eliminado'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

routerCarrito.post('/productos', async function(req, res){
    try {
        let idCarrito = req.body.idCarrito;
        let idProducto = req.body.idProducto;
        const carrito = await Carro.addProduct(idCarrito, idProducto);
        res.status(201).send({
            status: 'ok',
            data: {
                carrito: carrito
            },
            message: 'Producto agregado al carrito'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });

    }
});

routerCarrito.delete('/eliminarProductos/:idC', async function(req, res){
    const idCart = req.params.idC;
    try {
        let idCarrito = req.body.idCarrito;
        let idProducto = req.body.idProducto;
        let idEnCarrito = idCart;
        const carrito = await Carro.deleteProduct(idCarrito, idProducto, idEnCarrito);
        res.status(200).send({
            status: 'ok',
            data: {
                carrito: carrito
            },
            message: 'Producto eliminado del carrito'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });

    }
});

module.exports = routerCarrito;