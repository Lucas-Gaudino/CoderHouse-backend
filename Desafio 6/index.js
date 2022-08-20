const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;


//importo socket.io
//https://socket.io/docs/v4/server-initialization/

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(process.env.PORT || 8080, () => console.log("SERVER ON"));

app.use('/public', express.static(__dirname + '/public'));
app.use(express.json()); //Los objetos que llegan en formato JSON
app.use(express.urlencoded({ extended: true }));//Los objetos que llegan en formato URL estan extendidos

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

let productsLucas = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];
class Products {
  constructor(products) {
      this.products = [...products];
  }
  getAll(){
      return this.products;
  }
  findOne(id){
      return this.products.find((item) => item.id == id);
  }
  create(product){
      const lastItem = this.products[this.products.length - 1];
      let newId = 1;
      if(lastItem){
          newId = lastItem.id + 1;
      }
      product.id = newId;
      this.products.push(product);
      return this.products[this.products.length - 1];
  }
  update(id, product){
      const productToInsert = { ...product, id };
      for(let i = 0; i < this.products.length; i++){
          if(this.products[i].id == id){
              this.products[i] = productToInsert;
              return productToInsert;
          }
          return undefined;
      }
     
  }
  deleteOne(id){
      const foundProduct = this.findOne(id);
      console.log("Producto encontrado" + foundProduct);
      if(foundProduct){
          this.products = this.products.filter((item) => item.id != id);
          return id
      }
      return undefined;
  }

}

app.get('/', (req, res) => {
  //abrir form.html
  
});



app.post('/api/products', (req, res) => {
 
  
});


app.get('/api/products', (req, res) => {
  
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('productslist', { products: productsLucas, productsExist: true });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.emit('products', productsLucas);
  socket.on('products', (product) => {
    
    const product1 = { ...product, id: productsLucas.length + 1 };
    product1.price = parseInt(product1.price);
    const producto = new Products(productsLucas);
    const allProducts = producto.getAll();
    const newProduct = producto.create(product1);
    productsLucas.push(newProduct);
    io.emit('products-server', productsLucas);

  } );
});