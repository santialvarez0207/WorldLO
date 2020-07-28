"use strict";
const express = require('express'); // para requerir el comando express
const morgan = require('morgan'); // para requerir el comando morgan
const app = express(); //crear un objeto
const cors = require('cors');
const { mongoose } = require('./database');
//configuracion de servidor
app.set('port', process.env.PORT || 3000); //crea la variable
//Funciones de prosesamiento de datos
app.use(morgan('dev'));
app.use(express.json()); //para que entienda los archivos punto json
app.use(cors({ origin: 'http://localhost:4200' }));
//Rutas
app.use('/api/Usuario', require('./routes/Usuarios.routes'));
app.use('/api/Paginas', require('./routes/paginas.routes'));
//inicializar
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});
