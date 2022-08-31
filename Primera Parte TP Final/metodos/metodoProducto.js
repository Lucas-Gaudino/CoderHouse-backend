const productsClass = require('../clases');
const productsLucas = new productsClass('productos.json');

//EXPORTAMOS LO QUE QUEREMOS QUE HAGA LA PÁGINA
let nuevoContenedor = [];

let getProducts = async function () {
     nuevoContenedor = await productsLucas.getAll(); 
};

getProducts();

exports.createProducts = async (req, res) => {
    const { body } = req;
    console.log(req);
    await getProducts();

    body.price = Number(body.price);
    body.code = Number(body.code);
    body.stock = Number(body.stock);

    body.id = arrayCompleto.length + 1;
    body.timestamp = Date.now();
    console.log(body);

    const product = await productsLucas.create(body);
    return body;

};

exports.updateProducts =  function (req, res) {

    const { id } = req.params;
    const { body } = req;
    console.log(body);
    body.price = parseInt(body.price);
    const productActulizable = nuevoContenedor.find((item) => item.id == id);
    productActulizable.title = body.title;
    productActulizable.price = body.price;
    productActulizable.thumbnail = body.thumbnail;
    const product = productsLucas.update(id, productActulizable);
    nuevoContenedor.push(product);


};

exports.deleteProducts = async function (req, res) {
    const { id } = req.params;
    const product = await productsLucas.deleteOne(id);
    nuevoContenedor.push(product);
};

exports.findProducts = function (req, res) {
    const { id } = req.params;

    
    const product = nuevoContenedor.find((item) => item.id == id);
    //SI NO HAY ID DEVOLVEMOS LA LISTA ENTERA Y SI TAMPOCO HAY ID DEVOLVEMOS UN MENSAJE DE ERROR
    if(id){
        if (product) {
            console.log(product);
            return product;
            
        } else {
            console.log('No hay productos cargados con el id: ' + id);
        }
    
    }else{
       return nuevoContenedor;
    }
   
};


    
