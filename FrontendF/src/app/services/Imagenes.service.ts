import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagenes } from '../Models/Imagenes';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  
  question: Imagenes[];
  readonly URI = 'http://localhost:3000/api/Imagenes';
  constructor(private http: HttpClient) { }

  getImageness() {
    return this.http.get<Imagenes[]>(this.URI);
  }
  postImagenes(img:Array<File>,cant:number) {
    const fd = new FormData();
    for (var i = 0; i <= cant-1; i++) {
      fd.append('image', img[i]);
    }
    

    return this.http.post(this.URI, fd);


  }
  deleteImagenes(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getImagenes(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
