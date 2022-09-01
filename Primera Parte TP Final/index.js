const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const Products = require('./clases');
const PORT = 8080;




const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json()); //Los objetos que llegan en formato JSON
app.use(express.urlencoded({ extended: true }));//Los objetos que llegan en formato URL estan extendidos


const { Router } = express;
const imAdmin = true;
const router = Router();
const controladorDeProductos = require('./controladores/controladorProducto');
const controladorDeCarrito   = require('./controladores/controladorCarrito');
app.use("/api/", router);


app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// CONFIGURACION DE RUTAS
router.get("/productos/:id?",  (req, res) => {
 controladorDeProductos.findProducts(req, res);
});

router.post("/productos", (req, res) => {
    if(imAdmin){
        controladorDeProductos.createProducts(req, res);
    }else{
        res.send({ message: "No estas autorizado para realizar esta accion" });
    }

});

router.put("/productos/:id", (req, res) => {
    if(imAdmin){
        controladorDeProductos.updateProducts(req, res);
    }else{
        res.send({ message: "No estas autorizado para realizar esta accion" });
    }
});

router.delete("/productos/:id", (req, res) => {
    if(imAdmin){
        controladorDeProductos.deleteProducts(req, res);
    }else{
        res.send({ message: "No estas autorizado para realizar esta accion" });
    }
});

//RUTAS DE CARRITO

router.get("/carrito/:id?", (req, res) => {
    controladorDeCarrito.findCart(req, res);
});

router.post("/carrito", (req, res) => {
    controladorDeCarrito.createCart(req, res);
});

router.put("/carrito/:id", (req, res) => {
    controladorDeCarrito.updateCart(req, res);
});

router.delete("/carrito/:id", (req, res) => {
    controladorDeCarrito.deleteCart(req, res);
} );

// PRODUCTOS DE CARRITOS

router.get("/carrito/productos/:id?", (req, res) => {
    controladorDeCarrito.findCartProducts(req, res);
});

router.post("/carrito/productos", (req, res) => {
    controladorDeCarrito.createCartProducts(req, res);
});

router.put("/carrito/productos/:id", (req, res) => {
    controladorDeCarrito.updateCartProducts(req, res);
});

router.delete("/carrito/productos/:id", (req, res) => {
    controladorDeCarrito.deleteCartProducts(req, res);
});




