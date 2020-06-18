const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let usuario = {
    nombre: '',
    celular: ''
};

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function(req, res) {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
});

app.route('/usuario')
    .get(function(req, res) {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
        };
        if (usuario.nombre === '' || usuario.celular === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El usuario no ha sido creado'
            };
        } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'respuesta del usuario',
                respuesta: usuario
            };
        }
        res.send(respuesta);
    })
    .post(function(req, res) {
        if (!req.body.nombre || !req.body.celular) {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'Los campos Nombre y Celular son necesarios'
            };
        } else {
            if (usuario.nombre !== '' || usuario.celular !== '') {
                respuesta = {
                    error: true,
                    codigo: 503,
                    mensaje: 'Usuario ya existente'
                };
            } else {
                usuario = {
                    nombre: req.body.nombre,
                    celular: req.body.celular
                };
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Usuario creado',
                    respuesta: usuario
                };
            }
        }

        res.send(respuesta);
    })
    .put(function(req, res) {
        if (!req.body.nombre || !req.body.celular) {
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'Los campos Nombre y Celular son necesarios'
            };
        } else {
            if (usuario.nombre === '' || usuario.apellido === '') {
                respuesta = {
                    error: true,
                    codigo: 501,
                    mensaje: 'El usuario no ha sido creado'
                };
            } else {
                usuario = {
                    nombre: req.body.nombre,
                    celular: req.body.celular
                };
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'Usuario actualizado',
                    respuesta: usuario
                };
            }
        }

        res.send(respuesta);
    })
    .delete(function(req, res) {
        if (usuario.nombre === '' || usuario.celular === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El usuario no ha sido creado'
            };
        } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario eliminado'
            };
            usuario = {
                nombre: '',
                celular: ''
            };
        }
        res.send(respuesta);
    });
app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
