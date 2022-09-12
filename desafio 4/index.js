//iniciar servidor express
const express = require('express');
const { Router } = express;

const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el servidor : ${PORT}`);
});

server.on('error', (error) => {
    console.error(error);
});

app.use(express.json()); //Los objetos que llegan en formato JSON
app.use(express.urlencoded({ extended: true }));//Los objetos que llegan en formato URL estan extendidos


app.use('/api/products',router);//


let productsLucas = [
    {
        id: 1,
        name: 'Produto 1',
        price: 100,
        description: 'Descrição do produto 1',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        name: 'Produto 2',
        price: 200,
        description: 'Descrição do produto 2',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 3,
        name: 'Produto 3',
        price: 300,
        description: 'Descrição do produto 3',
        image: 'https://picsum.photos/200/300'
    },
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const products = new Products(productsLucas);
    console.log(id,products);
    const deletedProduct = products.deleteOne(id);

    console.log("Productos eliminados : " + deletedProduct);

    if(deletedProduct){
        res.json({success: true, deleted: deletedProduct});
    }else{
        res.json({success: false});
    }
});


router.get('/form', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/', (req, res) => {
    const {body} = req;
    body.price = parseInt(body.price);
    const product = new Products(productsLucas);
    const newProduct = product.create(body);
    res.json({success  : true, new: newProduct});
});




router.put('/:id', (req, res) => {
    let {id} = req.params;
    const {body} = req;
    const products = new Products(productsLucas);

    const changedProduct = products.update(id, body);
    console.log(changedProduct);
    if(changedProduct){
        res.json({success: true, changed: changedProduct});
    }else{
        res.json({success: false});
    }

});

router.get('/:id', (req, res) => {
    let {id} = req.params;
    
    const product = new Products(productsLucas);
    id = parseInt(id);
    const productFound = product.findOne(id);

    if(productFound){
        res.json(productFound);
    }else{
        res.status(404).send('Producto no encontrado');
    }
    console.log(id);
});




router.get('/', (req, res) => {
    const products = new Products(productsLucas);
    res.json(products.getAll());
  
});
