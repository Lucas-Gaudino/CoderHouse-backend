const fs = require ('fs');


class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo+".txt";
    }
    async getData(){
        try{
            return await fs.promises.readFile(this.nombreArchivo, 'utf8');
        }catch(error){
            if(error.code === 'ENOENT'){
                fs.writeFile(this.nombreArchivo, '[]', (error) => {
                    if (error) throw error;
                });
            }
        }
    }
    async getAll(){
        const data = await this.getData();
        return JSON.parse(data);

    }
    
    async save(objeto){
        let contenidoArchivo = await this.getData();
        let contenidoJson = JSON.parse(contenidoArchivo);
        let arreglo = [];
        if(contenidoJson.length > 0){
            arreglo = contenidoJson;
        }
        const indice = contenidoJson.map(x=>x.id).sort();
        objeto.id = indice[indice.length-1]+1;
        contenidoJson.push(objeto);
        await fs.writeFile(this.nombreArchivo, JSON.stringify(contenidoJson), (error) => {
            if (error) throw error;
        });

    }
        
    async getById(id){
        const data = await this.getData();
        const contenidoJson = JSON.parse(data);
        const objeto = contenidoJson.find(x=>x.id === id);
        return objeto;
    }
    async deleteById(id){
        const data = await this.getData();
        const contenidoJson = JSON.parse(data);
        const objeto = contenidoJson.find(x=>x.id === id);
        const indice = contenidoJson.indexOf(objeto);
        contenidoJson.splice(indice, 1);
        await fs.writeFile(this.nombreArchivo, JSON.stringify(contenidoJson), (error) => {
            if (error) throw error;
        });
    }
    async deleteAll(){
        await fs.writeFile(this.nombreArchivo, '[]', (error) => {
            if (error) throw error;
        });
    }
}


const objetoInicial = {
    id : "3",
    nombre: "Zapatos",
    marca: "Nike"
}
const objeto= new Contenedor("prueba2");


module.exports = Contenedor;