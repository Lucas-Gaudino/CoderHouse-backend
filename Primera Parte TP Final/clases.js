const fs = require('fs');

class Products {
   constructor(nameFile) {
    this.nameFile =nameFile;
   }
   save = async (products) => {
    try {
      await fs.promises.writeFile(this.nameFile, JSON.stringify(products, null, '\t'));
    } catch (error) {
      console.log(error);
    }
  };
    getAll = async () => {
    try {
      const products = await fs.promises.readFile(this.nameFile, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
    }
  };
    findOne = async (id) => {
    try {
      const products = await this.getAll();
      return products.find((item) => item.id == id);
    } catch (error) {
      console.log(error);
    }
  };
    create = async (product) => {
    try {
      const products = await this.getAll();
      const lastItem = products[products.length - 1];
      let newId = 1;
      if (lastItem) {
        newId = lastItem.id + 1;
      }
      product.id = newId;
      products.push(product);
      await this.save(products);
      return product;
    } catch (error) {
      console.log(error);
    }
  };
    update = async (id, product) => {
    try {
      const products = await this.getAll();
      const productToInsert = { ...product, id };
      for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
          products[i] = productToInsert;
          await this.save(products);
          return productToInsert;
        }
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };
    deleteOne = async (id) => {
    try {
      const products = await this.getAll();
      const foundProduct = products.find((item) => item.id == id);
      if (foundProduct) {
        const newProducts = products.filter((item) => item.id != id);
        await this.save(newProducts);
        return id;
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };
}


module.exports = Products;