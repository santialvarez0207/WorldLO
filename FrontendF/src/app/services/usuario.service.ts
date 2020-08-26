import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Models/usuario';
import { UsuariosComponent } from '../Components/usuarios/usuarios.component';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario[];
  readonly URI = 'http://localhost:3000/api/Usuarios';
  constructor(private http: HttpClient) { }

  getusuarios() {
    return this.http.get<Usuario[]>(this.URI);
  }
  postusuarios(name: string, password: string, mail: string, tipeuser: string) {
    const fd = new Usuario();
    fd.name = name;
    fd.password = password;
    fd.mail = mail;
    fd.tipeuser = tipeuser;
    return this.http.post(this.URI, fd);
  }

  putusuarios(_id: string, name: string, password: string, mail: string, tipeuser: string,
    like1:string,like2:string,like3:string, config:Array<string>,
    Group:Array<{name:string;id:string;}>,Like:Array<{name:string;id:string;}>,
    Chat:Array<{idFriend:string;NameFriend:string;mensaje:Array<string>;orden:Array<string>;}>) 
  {
    return this.http.put<Usuario[]>(this.URI + `/${_id}`, {name, password, mail, tipeuser,like1,like2,like3,config,Group,Like,Chat });
  }
  getusuario(id: string) {
    return this.http.get<Usuario>(this.URI + `/${id}`);
  }
  deleteusuarios(id: string) {
    return this.http.delete<Usuario[]>(`${this.URI}/${id}`);
  }
}
