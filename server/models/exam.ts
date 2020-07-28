import { Schema,model,Document }from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const ExamSchema =new Schema({
imgUrl:String,
title:String,
intro:String,
usserid:String,
ussename:String,
data:[Number],
questionid: [String]

});

export interface IExam extends Document{
    imgUrl:string;
    title:string;
    intro:string;
    usserid:string;
    ussename:string;
    data:[number];
    questionid: [String];
}

export default model<IExam>('Exam',ExamSchema)//envia la estructura a mongo

