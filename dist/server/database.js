"use strict";
//mongo
const mongoose = require('mongoose'); //requiriendo mongo o mongoose
const URI = 'mongodb://localhost/mean-crud'; //url
mongoose.connect(URI) // Coneccion a la url
    .then(db => console.log('DB is connected')) //Si se conecta
    .catch(err => console.error(err)); //si hay error
