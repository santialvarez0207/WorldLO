import { Schema,model,Document }from 'mongoose';

const imagenesSchema =new Schema({
U:[{
  fieldname: String,
  originalname:  String,
  encoding:  String,
  mimetype:  String,
  destination:  String,
  filename:  String,
  path:  String,
  size: Number
}]
}); // esta es la estructura que se envia a mongod

export interface Iimagenes extends Document{
  U:[{
    fieldname: string;
    originalname:  string;
    encoding:  string;
    mimetype:  string;
    destination:  string;
    filename:  string;
    path:  string;
    size: number;
  }]
} //estructura con la que se trabaja en el procesado de backend
export default model<Iimagenes>('Iimagenes',imagenesSchema)//envia la estructura a mongo