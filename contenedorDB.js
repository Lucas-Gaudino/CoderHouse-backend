
class contenedorDB {
    constructor(options, table) {
        this.knex = require("knex")(options);
        this.table = table;
    }
    async getAll() {
      const todos = await this.knex.from(this.table).select("*");
      return todos;
    }
    async save(producto) {
      const id = await this.knex(this.table).insert(producto);
      return id;
    }
    async getById(id) {
      const datoPorId = await this.knex.from(this.table).select("*").where({ id: id });
      return datoPorId;
    }
    async deleteById(id) {
      const eliminado = await this.knex.from(this.table).where({ id: id }).del();
      return eliminado;
    }
    async deleteAll() {
      const eliminarTodo = await this.knex.from("productos").del();
      return eliminarTodo;
    }
  }

module.exports =  contenedorDB;
  