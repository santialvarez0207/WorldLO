import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../Models/Exam';
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exam: Exam[];
  readonly URI = 'http://localhost:3000/api/Exam';
  constructor(private http: HttpClient) { }

  getExams() {
    return this.http.get<Exam[]>(this.URI);
  }
  postExam(title:string,intro:string,usserid:string,ussename:string,configuracion:Array<string>,
      questionid: Array<{
      preguntas: Array<string>;
      correcta:string;
      pregunta:string;
  }>,
    imagen:Array<string>,orden:Array<string>) {
    const fd = new Exam();
    fd.title=title;
    fd.intro=intro;
    fd.usserid=usserid;
    fd.ussename=ussename;
    fd.configuracion=configuracion;
    fd.questionid=questionid;
    fd.imagen=imagen;
    fd.orden=orden;


    return this.http.post(this.URI, fd);


  }
  putExam(id: string, title:string,intro:string,usserid:string,ussename:string,configuracion:Array<string>,
    questionid: Array<{
    preguntas: Array<string>;
    correcta:string;
    pregunta:string;
}>,
  imagen:Array<string>,orden:Array<string>,    
  respondidas: Array<{
    respuestas: Array<string>;
    nombre: string;
    puntuacion: number;
}>) {

    return this.http.put(`${this.URI}/${id}`, { id, title, intro, usserid, ussename, questionid,configuracion,imagen,orden,respondidas});
  }

  deleteExam(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getExam(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
