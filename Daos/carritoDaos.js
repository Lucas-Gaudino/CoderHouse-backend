const admin = require('firebase-admin');
const serviceAccount = require('./bd/segunda-entrega-4411a-firebase-adminsdk-ggsgt-7c4567f86d.json');
const Producto = require('./productoDaos')



const Productos = new Producto();

class Carrito {
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://segunda-entrega-4411a.firebaseio.com"
        });
    }
    async newCarrito(){
        const db = admin.firestore();
        const query = db.collection('carritos')
        let time = new Date();
        try {
            const doc = await query.create({
                timestamp: time.toString(),
                productos: []
            });
            return carrito
        } catch (error) {
            console.log('Error al crear el carrito');


        }
    }
    async getCarritoById(id){
        const db = admin.firestore();
        const query = db.collection('carritos').doc(id);
        try {
            const doc = await query.get();
            const carrito = doc.data();
            return carrito
        } catch (error) {
            console.log('Error al leer el carrito');
        }
    }
    async deleteCarritoById(id){
        const db = admin.firestore();
        const query = db.collection('carritos').doc(id);
        try {
            const doc = await query.delete();
            return doc
        } catch (error) {
            console.log('Error al eliminar el carrito');
        }
    }
    async deleteProductoDeCarrito(idCarrito, idProducto){
        const db = admin.firestore();
        const query = db.collection('carritos').doc(idCarrito);
        try {
            const doc = await query.get();
            const carrito = doc.data();
            const productos = carrito.productos;
            const index = productos.findIndex( producto => producto.id === idProducto);
            if(index === -1){
                return false
            }
            productos.splice(index, 1);
            await query.update({
                productos: productos
            });
            return true
        } catch (error) {
            console.log('Error al eliminar el producto del carrito');
        }
    }
    async agregarProducto(idCarrito, idProducto){
        const db = admin.firestore();
        const query = db.collection('carritos').doc(idCarrito);
        try {
            const doc = await query.get();
            const carrito = doc.data();
            const productos = carrito.productos;
            const producto = await Productos.getById(idProducto);
            if(producto){
                productos.push(producto);
                await query.update({
                    productos: productos
                });
                return true
            }
            return false
        } catch (error) {
            console.log('Error al agregar el producto al carrito');
        }
    }
}

module.exports = Carrito


   



