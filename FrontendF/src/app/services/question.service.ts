import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../Models/Question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: Question[];
  readonly URI = 'http://localhost:3000/api/Question';
  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get<Question[]>(this.URI);
  }
  postQuestion(text: string, resp: Array<string>, cres: string, Uid: string) {
    const fd = new Question();
    fd.text = text;
    fd.resp = resp;
    fd.Cres = cres
    fd.Uid = Uid


    return this.http.post(this.URI, fd);


  }
  putQuestion(text: string, resp: Array<string>, cres: string, id: String, Uid: string) {

    return this.http.put(`${this.URI}/${id}`, { text, resp, cres, Uid });
  }

  deleteQuestion(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getQuestion(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
