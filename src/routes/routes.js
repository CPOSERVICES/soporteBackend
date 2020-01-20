var express = require('express');
var app = express.Router();
var controller = require('../controllers/controller');

//Comun
app.get('/comentarios/:id', controller.listaComentarios);
app.post('/login', controller.login);

//TECNICO
app.get('/tecnico/:id', controller.listarParaTecnico);
app.get('/soporte/:id', controller.obtenerSoporteId);

//USUARIO
app.get('/usuario/:id', controller.listarParaUsuario);
app.post('/crear', controller.crear);
app.put('/actualiza/:id', controller.actualiza);
app.delete('/soporte/:id', controller.eleminaS);
app.get('/tecnicoA/:id',controller.obtenerTecnicoAsigando);

//MASTER
app.get('/soportes', controller.listar);
app.get('/soportesC', controller.listarC);
app.get('/soportesR', controller.listarMaster);
app.post('/soporteComentario', controller.enviarComentarios);

app.post('/enviarU', controller.envioMailUsuario);
app.post('/enviarT', controller.envioMailTecnico);
app.get('/obtenerMails/:id', controller.obtenerCorreos);







module.exports = app;