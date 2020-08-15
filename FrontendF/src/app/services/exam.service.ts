import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../Models/Exam';
import { Creacioncomponent } from '../Components/Creacion/Creacion.component';
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
  postExam(title: string, intro: string, usserid: string, ussename: string, img: File, questionid: Array<string>, cant: number) {
    const fd = new FormData();
    for (var i = 0; i <= cant - 1; i++) {
      fd.append('questionid', questionid[i])
    }
    fd.append('title', title);
    fd.append('intro', intro);
    fd.append('usserid', usserid);
    fd.append('ussename', ussename);
    fd.append('image', img);

    return this.http.post(this.URI, fd);


  }
  putExam(id: string, title: string, intro: string, usserid: string, ussename: string, questionid: Array<string>) {

    return this.http.put(`${this.URI}/${id}`, { id, title, intro, usserid, ussename, questionid });
  }

  deleteExam(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getExam(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
