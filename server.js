//Llamo a las clases del contenedor de DB
const contenedorDB = require("./contenedorDB");
//llamo a las configuraciones de las bases de datos
const { options: SQLite } = require("./options/sqlite");
const { options: MySQL } = require("./options/mysql");
//chatBase de datos
const chatBase = new contenedorDB(SQLite, "chat");
//productosBase de datos
const productosBase = new contenedorDB(MySQL, "products");

const express = require("express");
const app = express();

//IMPLEMENTACION DE SOCKET.IO
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//confuguracion de router
const { Router } = express;
const router = Router();


httpServer.listen(3000, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);

//crear tabla de chat
chatBase.knex.schema.hasTable("chat").then((exists) => {
  if (!exists) {
    chatBase.knex.schema
      .createTable("chat", (table) => {
        table.increments("id");
        table.string("email");
        table.string("mensajes");
        table.string("fecha");
      })
      .then(() => {
        console.log("Tabla de chat creada");
      });
  }
});

//crear tabla de productos
productosBase.knex.schema.hasTable("products").then((exists) => {
  if (!exists) {
    productosBase.knex.schema
      .createTable("products", (table) => {
        table.increments("id");
        table.string("title");
        table.string("price");
        table.string("thumbnail");
      })
      .then(() => {
        console.log("Tabla de productos creada");
      });
  }
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});



let mensajes = [];


io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado');

  let mensajes = await chatBase.getAll();
  let productos = await productosBase.getAll();

  socket.emit('messages', mensajes);
  socket.emit('productos', productos);


  socket.on('new-product', async (producto) => {
   
    await productosBase.save(producto);
    
    let productos = await productosBase.getAll();
    console.log(productos);
    io.sockets.emit('productos', productos);
  });


  socket.on('new-message',async (data) => {
      console.log("Llego un mensaje");
      //guardar dato de objeto mensaje en base de datos
      await chatBase.save(data);
      let mensajes = await chatBase.getAll();
      

      //enviar mensaje a todos los clientes
      io.sockets.emit('messages', mensajes);
  });
});
