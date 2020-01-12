var express = require('express');
var app = express.Router();
var session = require('express-session');

var controller = require('../controllers/controller');

app.post('/login', controller.login);
app.get('/soportes', controller.listar);
app.post('/crear', controller.crear);
app.get('/soporte/:id', controller.obtenerSoporteId);
app.get('/tecnicoA/:id',controller.obtenerTecnicoAsigando);
app.put('/actualiza/:id', controller.actualiza);
app.delete('/soporte/:id', controller.eleminaS);


//TECNICO
app.get('/tecnico/:id', controller.listarParaTecnico);

//TECNICO
app.get('/usuario/:id', controller.listarParaUsuario);

//MASTER
app.get('/soportesC', controller.listarC);
app.get('/soportesR', controller.listarMaster);
app.post('/soporteComentario', controller.enviarComentarios);

//Comun
app.get('/comentarios/:id', controller.listaComentarios);





module.exports = app;