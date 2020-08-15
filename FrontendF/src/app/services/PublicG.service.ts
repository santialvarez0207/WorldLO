import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicG } from '../Models/PublicG';
import { Creacioncomponent } from '../Components/Creacion/Creacion.component';
@Injectable({
  providedIn: 'root'
})
export class PublicGService {
  exam: PublicG[];
  readonly URI = 'http://localhost:3000/api/PublicG';
  constructor(private http: HttpClient) { }

  getPublicGs() {
    return this.http.get<PublicG[]>(this.URI);
  }

  postPublicG(title: string, intro: string, usserid: string, ussename: string, img: File, temp: string ) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('intro', intro);
    fd.append('usserid', usserid);
    fd.append('ussename', ussename);
    fd.append('temp', temp);
    fd.append('image', img);
    return this.http.post(this.URI, fd);
  }

  putPublicG(id: string, title: string, intro: string, usserid: string, ussename: string, temp: string) {

    return this.http.put(`${this.URI}/${id}`, { id, title, intro, usserid, ussename, temp });
  }

  deletePublicG(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getPublicG(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
