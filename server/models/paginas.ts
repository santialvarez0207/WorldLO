import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const paginasSchema =new Schema({
imgUrl:String,
title:String,
intro:String,
usserid:String,
ussename:String,
like1:String,
like2:String,
like3:String,
cont:String,
datacreate:String,
views:Number,
like:Number,
Texto:[String],
imgUrlB:[String],
videos:[String],
orden:[String],
idCreador:[String],
Creador:[String],
com:[String],
likeid:[String]

});

export interface Ipaginas extends Document{
 // estructura de la pagina
    imgUrl:string;
    title:string;
    intro:string;
    usserid:string;
    ussename:string;
    like1:string;
    like2:string;
    like3:string;
    cont:string;
    datacreate:string;
    Texto:[string];
    imgUrlB:[string];
    videos:[string];
    orden:[string];
    //Datos de la pag en cuanto a tendencia
    like:number;
    likeid:[string];
    //Abajo --- Todo relacionado a comentarios
    idCreador:[string];
    Creador:[string];
    com:[string];
}

export default model<Ipaginas>('Paginas',paginasSchema)//envia la estructura a mongo

