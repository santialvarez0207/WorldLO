import { Schema, model, Document } from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const PublicGSchema = new Schema({
    imgUrl: String,
    text: String,
    temp: String,
    usserid: String,
    ussename: String,
});

export interface IPublicG extends Document {
    imgUrl: string;
    title: string;
    intro: string;
    temp: string;
    usserid: string;
    ussename: string;
}

export default model<IPublicG>('PublicG', PublicGSchema)//envia la estructura a mongo

