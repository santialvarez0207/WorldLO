import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../Models/Page';
import { Creacioncomponent } from '../Components/Creacion/Creacion.component';
@Injectable({
  providedIn: 'root'
})
export class PageService {
  page: Page[];
  readonly URI = 'http://localhost:3000/api/Paginas';
  constructor(private http: HttpClient) { }

  getPaginas() {
    return this.http.get<Page[]>(this.URI);
  }
  
  postPagina(title: string, intro: string, usserid: string, ussename: string, like1: string, like2: string, like3: string, cont: string, img: File, Texto: Array<string>,videos:Array<string>,orden:Array<string>,imgUrlB:Array<string>,datos:Array<number>) {
    const fd = new FormData();

    for (var i = 0; i <= datos[0]-2; i++) {
      fd.append('Texto', Texto[i]);
    }
    for (var i = 0; i <= datos[2]-1; i++) {
      fd.append('videos', videos[i]);
    }
    for (var i = 0; i <= datos[1]; i++) {
      fd.append('imgUrlB', imgUrlB[i]);
    }
    for (var i = 0; i <= datos[3]-1; i++) {
      fd.append('orden', orden[i]);
    }



    fd.append('title', title);
    fd.append('intro', intro);
    fd.append('usserid', usserid);
    fd.append('ussename', ussename);
    fd.append('like1', like1);
    fd.append('like2', like2);
    fd.append('like3', like3);
    fd.append('cont', cont);
    fd.append('image', img);

    return this.http.post(this.URI, fd);
  }
  
  putPagina(id: string, title: string, intro: string, usserid: string, ussename: string, like1: string, like2: string, like3: string, cont: string,
    Texto: Array<string>, com: Array<string>, idCreador: Array<string>, Creador: Array<string>, like, videos:Array<string>,orden:Array<string>,imgUrlB:Array<string>,likeid:Array<string>) {

    return this.http.put(`${this.URI}/${id}`, { id, title, intro, usserid, like1, like2, like3, cont, Texto, com, idCreador, Creador, like,ussename,videos,orden,imgUrlB,likeid });
  }

  deletePagina(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getPagina(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
