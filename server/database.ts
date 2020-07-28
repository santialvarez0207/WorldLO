import { connect } from 'mongoose'

export async function startConnection() { //conexion con mongodb
    const db = await connect('mongodb://localhost/mean-crud',{
        useNewUrlParser: true, //configuracion para evitar errores
        useFindAndModify: false 
    });
    console.log('Database is connected');
}