const socket = io.connect();
function render(data) {
    const html = data.map((elem, index) => {
        return(`
        <div class="mb-3 container">
            <div class="d-flex justify-content-evenly ">
            <p class="fw-bold text-primary mr-5">${elem.author}:</p>
            <p class="text-success mr-5"> ${elem.text}</p> 
            <p class="text-warning fst-italic mr-5">${elem.time}</p>
            </div>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;

}


function addMessage(e) {
    
// crea un nuevo objeto `Date`
var today = new Date();
 
// obtener la fecha y la hora
var now = today.toLocaleString();
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        time: now
    };
    socket.emit('new-message', mensaje);
    return false;
}


socket.on('messages', function(data) { render(data); });