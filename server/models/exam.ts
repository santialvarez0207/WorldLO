import { Schema, model, Document } from 'mongoose'; // utilizar mongo pero solo lo esquemas , es decir la forma de organizar los datos

const ExamSchema = new Schema({
    imgUrl: String,
    title: String,
    intro: String,
    usserid: String,
    ussename: String,
    configuracion: [String],

    questionid: [{
        preguntas: [String],
        correcta: String,
        pregunta:String,
    }],

    respondidas: [{
        respuestas: [String],
        nombre: String,
        puntuacion: Number
    }],
    
    imagen: [String],
    orden: [String],

});

export interface IExam extends Document {
    imgUrl: string;
    title: string;
    intro: string;
    usserid: string;
    ussename: string;
    configuracion: [string];

    questionid: [{
        preguntas: [string];
        correcta: string;
        pregunta:string;
    }],

    respondidas: [{
        respuestas: [string];
        nombre: string;
        puntuacion: number;
    }],

    imagen: [string];
    orden: [string];

}

export default model<IExam>('Exam', ExamSchema)//envia la estructura a mongo

