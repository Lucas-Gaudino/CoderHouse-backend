
const socket = io.connect();

console.log("hola");
function render(data) {
    const html = data.map((elem, index) => {
        return (`
            <div class="message">
                <strong>${elem.email}</strong>
                <p>${elem.mensaje}</p>
                <em>${elem.fecha}</em>
            </div>
        `);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;

}


function addMessage(e) {
    console.log("enviando mensaje");
    // crea un nuevo objeto `Date`
    var today = new Date();
    
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    
    const mensaje = {
        email: document.getElementById('email').value,
        mensajes: document.getElementById('mensaje').value,
        fecha: now
    };

    socket.emit('new-message', mensaje);
    return false;
}


socket.on('messages', function(data) { render(data); });

//productos
function addProducto(e) {
    console.log("enviando producto");
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    console.log(producto);
    socket.emit('new-product', producto);
    return false;
}


function renderProductosTabla(data) {
    const html = data.map((elem, index) => {
        return (`
            <tr>
                <td>${elem.title}</td>
                <td>$${elem.price}</td>
                <td><img src="${elem.thumbnail} " class="rounded float-end w-25"></td>
            </tr>
        `);
    }).join(" ");

    document.getElementById('productos').innerHTML = html;

}

socket.on('productos', function(data) { renderProductosTabla(data); });
