const Contenedor = require('./contenedor.js');
const express = require('express');
const app = express();

let productos  = new Contenedor('productos');
const server = app.listen(3000, () => {
    console.log('listening on port 3000');
});

server.on('error', (err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/productos', (req, res) => {
    (async () => {
        await productos.getAll().then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    })();
});


app.get('/productosRandom', (req, res) => {
    (async () => {
        await productos.getAll().then(data => {
            let random = Math.floor(Math.random() * data.length);
            res.send(data[random]);
        }).catch(err => {
            res.send(err);
        })
    })();
});

