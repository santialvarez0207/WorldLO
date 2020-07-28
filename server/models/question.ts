import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const QuestionSchema =new Schema({
img:String,
text:String,
resp:[String],
Cres:String,
tipe:Number,
Uid:String
});

export interface IQuestion extends Document{
    img:number;
    text:string;
    res:[string];
    Cres:string;
    tipe:number;
    Uid:string;
}

export default model<IQuestion>('Question',QuestionSchema)//envia la estructura a mongo

