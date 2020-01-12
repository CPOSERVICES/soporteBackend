//requires
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var mysql = require('mysql2');
var myConnection = require('express-myconnection');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
//importacion de rutas
var appRoutes = require('./routes/routes');

//inicializacion
var app = express();

//Cords
app.use(cors());

//configuracion
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'cpo.2020',
    port: 3306,
    database: 'soporte'
}, 'single'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

/*=======================================================*/
/*=========================RUTAS=========================*/
/*=======================================================*/
/*=========================LOGIN=========================*/
app.post('/login', appRoutes)

/*=========================USUARIOS=========================*/
app.get('/soportes', appRoutes);
app.get('/soporte/:id', appRoutes);
app.post('/crear', appRoutes)
app.put('/actualiza/:id', appRoutes)
app.delete('/soporte/:id', appRoutes);
app.get('/usuario/:id', appRoutes);
app.get('/tecnicoA/:id',appRoutes);

/*=========================TECNICOS=========================*/
app.get('/tecnico/:id', appRoutes);

/*=========================MASTER=========================*/
app.get('/soportesC', appRoutes)
app.get('/soportesR', appRoutes);
app.post('/soporteComentario', appRoutes);

/*=========================COMUN=========================*/
app.get('/comentarios/:id', appRoutes)

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//escucha peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});