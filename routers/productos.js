const express = require('express');
const {productosDaos: Producto} = require('../Daos/mainDaos');
const routerProductos = express.Router();

routerProductos.get('/:id', async function(req, res){
    //si el id es "all" entonces que me devuelva todos los productos y si no que me devuelva el producto segun el id
    const idParam = req.params.id
    const prod = new Producto()

    if(idParam == "all"){
        try {
            const productos = await prod.getAll()
            res.status(200).send({
                status: 'ok',
                data: {
                    productos: productos
                },
                message: 'Productos encontrados'
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }else{
        try {
            const producto = await prod.getById(idParam)
            res.status(200).send({
                status: 'ok',
                data: {
                    producto: producto
                },
                message: 'Producto encontrado'
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }
});

routerProductos.post('/', async function(req, res,next){
    // si sos admin podes agregar un producto
    if (req.query.admin == 1){
        console.log("admin");
        next();
    }else{
        res.status(401).send({
            status: 'error',
            message: 'No tiene permisos para acceder a esta seccion'
        });
    }
}, async function(req, res){
    try {
        const producto = await prod.save(req.body)
        res.status(201).send({
            status: 'ok',
            data: {
                producto: producto
            },
            message: 'Producto agregado'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

routerProductos.put('/:id', async function(req, res,next){
    // si sos admin podes modificar un producto
    if (req.query.admin == 1){
        console.log("admin");
        next();
    }else{
        res.status(401).send({
            status: 'error',
            message: 'No tiene permisos para acceder a esta seccion'
        });
    }
}, async function(req, res){
    try {
        const producto = await prod.changeById(req.params.id, req.body)
        res.status(200).send({
            status: 'ok',
            data: {
                producto: producto
            },
            message: 'Producto modificado'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

routerProductos.delete('/:id', async function(req, res,next){
    // si sos admin podes eliminar un producto
    if (req.query.admin == 1){
        console.log("admin");
        next();
    }else{
        res.status(401).send({
            status: 'error',
            message: 'No tiene permisos para acceder a esta seccion'
        });
    }
}, async function(req, res){
    const num = req.params.id
    try {
        let idProd = parseInt(num)
        const prod = new Producto()
        const producto = await prod.deleteById(idProd)
        res.status(200).send({
            status: 'ok',
            data: {
                producto: producto
            },
            message: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = routerProductos;


