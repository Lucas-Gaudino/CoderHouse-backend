const socket = io();



const formu = document.querySelector('#note-form');

let title = document.querySelector('#title');
let price = document.querySelector('#price');
let thumbnail = document.querySelector('#thumbnail');

let table = document.querySelector('#table');
formu.addEventListener("submit", (e) => {
  e.preventDefault();
 
  
  let product = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value
  };

  console.log(product);
  socket.emit('client:newnote')
  socket.emit("products", product);
});

//ATRAPAN MSGS QUE ENVIE EL SERVER
socket.on("connect", () => {
  console.log("me conecte!");
});

socket.on('products-server', (product) => {
  console.log(product);
  //agregar producto al frontend con innerHTML en la tabla
  let row = table.insertRow(-1);

  let ultimoProducto = product[product.length - 1];
  table.innerHTML += `
  <tr>
  <th scope="row">${ultimoProducto.id } </th>
  
  <td>${ultimoProducto.title}</td>
  <td>${ultimoProducto.price }</td>
  <td><button type="button"  data-toggle="modal" data-target="#exampleModal${this.id}">
  <img src="${ultimoProducto.thumbnail }" class="mybox mh-100" style="width: 100px; height: 100px;"/>
</button> </td>
<div class="modal fade" id="exampleModal${this.id}" tabindex="${this.id}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="${ultimoProducto.thumbnail }" class="mybox mh-100" style="width: 500px; height: 500px;"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </tr>
  `;

});

//lightbox for images of table
