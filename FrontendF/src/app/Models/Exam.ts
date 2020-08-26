export class Exam {
    _id:string;
    imgUrl: string;
    title: string;
    intro: string;
    usserid: string;
    ussename: string;
    configuracion: Array<string>;

    questionid: Array<{
        preguntas: Array<string>;
        correcta:string;
        pregunta:string;
    }>;

    respondidas: Array<{
        respuestas: Array<string>;
        nombre: string;
        puntuacion: number;
    }>;

    imagen: Array<string>;
    orden: Array<string>;
}
