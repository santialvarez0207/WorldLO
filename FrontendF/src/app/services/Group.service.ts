import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../Models/Group';
import { Creacioncomponent } from '../Components/Creacion/Creacion.component';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  exam: Group[];
  readonly URI = 'http://localhost:3000/api/Group';
  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get<Group[]>(this.URI);
  }

  postGroup(Name: string, Description: string, usserid: string, ussename: string, img: File) {
    const fd = new FormData();
    fd.append('Name',Name);
    fd.append('Description',Description);
    fd.append('usserid', usserid);
    fd.append('ussename', ussename);
    fd.append('image', img);
    return this.http.post(this.URI, fd);
  }

  putGroup(id:string,Name: string, Description: string, usserid: string, ussename: string,    
    Users:Array<{idUser:string;Name:string;Admin:string;}>,    
    Public:Array<{idUser:string;Name:string;cont:string;imagen:string;lDate:string;}>,
  imgUrl:string) {

    return this.http.put(`${this.URI}/${id}`, { Name, Description, Public, usserid, ussename, Users,imgUrl});
  }

  deleteGroup(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getGroup(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
