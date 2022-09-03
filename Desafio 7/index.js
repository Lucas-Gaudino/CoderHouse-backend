const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

var config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test'
  }
};

const knex = require('knex')(config);

//importo socket.io
//https://socket.io/docs/v4/server-initialization/

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(process.env.PORT || 8080, () => console.log("SERVER ON PORT" + PORT));

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
  { id: 1, title: 'nike ball', price: 101, stock: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, stock: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, stock: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

class Products {
  constructor(products) {

    
    this.products = products;
       
  }
  async getAll(){
      //tomar de base de datos mysql todos los productos
      try{
      await knex 
      .select('*')
      .from('products')
      .then((rows) => {
          console.log(rows);
          return rows;
      })
    }catch(err){
      console.log(err);
      }
      
  }
  async findOne(id){
    try{

    await knex
      .select('*')
      .from('products')
      .where('id', id)
      .then((rows) => {
          console.log(rows);
          return rows;
      })
    }catch(err){
      console.log(err);
  }
  
  }
 async create(product){
  try{    
  await knex 
      .insert(product)
      .into('products')
      .then((rows) => {
          console.log(rows);
          return rows;
      })
    }catch(err){
      console.log(err);
  }
  
  }
  async update(id, product){
    try{
      await knex 
        .update(product)
        .from('products')
        .where('id', id)
        .then((rows) => {
            console.log(rows);
            return rows;
        })
    }catch(err){
      console.log(err);
  }
 
  }
  async deleteOne(id){
      try{
       await knex 
      .delete()
      .from('products')
      .where('id', id)
      .then((rows) => {
          console.log(rows);
          return rows;
      })
    }catch(err){
        console.log(err);
    }
   
  }

}

app.get('/', (req, res) => {
  //abrir form.html
  
});



app.post('/api/products', (req, res) => {
  //guardar producto en base de datos
  const { title, price, stock } = req.body;
  const product = { title, price, stock };
  const newProduct = new Products();
  newProduct.create(product);
  res.redirect('/');
});


app.get('/api/products', (req, res) => {
  //devolver todos los productos
  const newProduct = new Products();
  const products =   newProduct.getAll();
  console.log(products);
  res.render('productslist', { products: products, productsExist: true });
});

app.get('/api/products/:id', (req, res) => {
  //devolver producto por id
  const id = req.params.id;
  const newProduct = new Products();
  const product = newProduct.findOne(id);
  //convertir product a json
  console.log("Desde el server: "+product);
});