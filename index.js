const express = require('express');
const routerProductos = require('./routers/productos.js');
const routerCarrito = require('./routers/carrito');

const app = express();
const port = 3000;

//administracion ficticia
const admin = true;

if( admin == true ){
    app.use('/productos', routerProductos);
    app.use('/carrito', routerCarrito);
}else{
    console.log("No tiene permisos para acceder a esta seccion");
}


//Server listening
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));