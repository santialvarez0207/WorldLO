import { Schema,model,Document }from 'mongoose';

const imagenesSchema =new Schema({
U:String,
}); // esta es la estructura que se envia a mongod

export interface Iimagenes extends Document{
  U:string;
} //estructura con la que se trabaja en el procesado de backend
export default model<Iimagenes>('Iimagenes',imagenesSchema)//envia la estructura a mongo