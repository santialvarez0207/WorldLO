import { Schema, model, Document } from "mongoose";

const SoliSchema = new Schema({
  name: String,
  mail: String,
  uid: String,
  fechan: String,
  fechas: String,
  imagenes: [String],
  dato: [String],
}); // esta es la estructura que se envia a mongod

export interface ISoli extends Document {
  name: string;
  uid: string;
  mail: string;
  fechan: string;
  fechas: string;
  imagenes: [string];
  dato: [String];
} //estructura con la que se trabaja en el procesado de backend
export default model<ISoli>("Solicitudes", SoliSchema); //envia la estructura a mongo
