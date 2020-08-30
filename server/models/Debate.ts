import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const VideoSchema =new Schema({
name:String,
password:String,
idcreador:String
});

export interface IVideo extends Document{
    name:string;
    password:string;
    idcreador:string;
}

export default model<IVideo>('Video',VideoSchema)//envia la estructura a mongo

