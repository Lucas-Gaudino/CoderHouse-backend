const moongose = require('mongoose');
const esquemaProducto = ('./modelsMDB/schemaProducto');

class ProductoDaos {
    async connectMDB() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
          }
        try {
            await moongose.connect('mongodb://localhost:27017/ecommerce', options);
            console.log('Conectado a MongoDB');
        } catch (error) {
            console.log('Error al conectar a MongoDB');
        }

    }

    async save(producto) {
        try{
            let time = new Date();
            await this.connectMDB();
            producto.time = time;
            await esquemaProducto.create(producto);
            console.log('Producto guardado');
            moongose.disconnect();
            const id = producto.idP;
            return id;
            

        }
        catch(error){
            console.log('Error al guardar el producto');
        }
    }

    async getAll() {
        try{
            await this.connectMDB();
            const productos = await esquemaProducto.find({});
            moongose.disconnect();
            return productos;
        }
        catch(error){
            console.log('Error al leer los productos');
        }
    }

    async getById(id) {
        try{
            await this.connectMDB();
            const producto = await esquemaProducto.find({idP: id});
            moongose.disconnect();
            return producto;
        }
        catch(error){
            console.log('Error al leer el producto');
        }
    }

    async changeById(id, producto) {
        try{
            await this.connectMDB();
            const productoModificado = await esquemaProducto.updateOne({idP: id}, {$set: producto});
            moongose.disconnect();
            return productoModificado;
        }
        catch(error){
            console.log('Error al modificar el producto');
        }
    }

    async deleteById(id) {
        try{
            await this.connectMDB();
            const productoBorrado = await esquemaProducto.deleteOne({idP: id});
            moongose.disconnect();
            return productoBorrado;
        }
        catch(error){
            console.log('Error al borrar el producto');
        }
    }

}

module.exports = ProductoDaos;


