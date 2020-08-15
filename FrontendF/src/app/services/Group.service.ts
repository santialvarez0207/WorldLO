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

  postGroup(Name: string, Description: string, usserid: string, ussename: string, img: File, Admins: Array<string>, Users: Array<string>, publicgroup: Array<string>, cant: Array<number>) {
    const fd = new FormData();
    for (var i=0;i<=cant[0];i++){
      fd.append('Admins', Admins[i]);
    }
    for (var i=0;i<=cant[1];i++){
      fd.append('Users', Users[i]);
    }
    for (var i=0;i<=cant[2];i++){
      fd.append('publicgroup', publicgroup[i]);
    }
    fd.append('Name',Name);
    fd.append('Description',Description);
    fd.append('usserid', usserid);
    fd.append('ussename', ussename);
    fd.append('image', img);
    return this.http.post(this.URI, fd);
  }

  putGroup(id:string,Name: string, Description: string, usserid: string, ussename: string, Admins: Array<string>, Users: Array<string>, publicgroup: Array<string>) {

    return this.http.put(`${this.URI}/${id}`, { Name, Description, Admins, usserid, ussename, Users,publicgroup });
  }

  deleteGroup(id: string) {
    return this.http.delete(`${this.URI}/${id}`);

  }

  getGroup(id: string) {
    return this.http.get(`${this.URI}/${id}`);
  }
}
