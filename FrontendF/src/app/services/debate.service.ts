import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Debate } from '../Models/Debate';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class DebateService {

  estion: Debate[];
  readonly URI = 'http://localhost:3000/api/Debate';
  constructor(private http: HttpClient) { }

  getDebates() {
    return this.http.get<Debate[]>(this.URI);
  }
  
  postDebate(name: string, idcreador: string, password: string) {
    const fd = new Debate();
fd.name=name;
fd.idcreador=idcreador;
fd.password=password;
    return this.http.post(this.URI, fd);
  }

  putDebate( id: String, name: string, idcreador: string, password: string) {
    return this.http.put(`${this.URI}/${id}`, { name, idcreador, password});
  }

  deleteDebate(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getDebate(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }

}
