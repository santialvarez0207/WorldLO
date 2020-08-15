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

  putusuarios(_id: string, name: string, password: string, mail: string, tipeuser: string)
  // ,like1:number,like2:number,like3:number
  // ,NomLL:string,LLreid:[string],G:[string],config:[string],Lre:[{NomL:string,Lreid:[string]}],
  // msg:[{Ncontacto:string,idcontacto:string,ord:[string],dm:[string]}]) 
  {
    return this.http.put<Usuario[]>(this.URI + `/${_id}`, { _id, name, password, mail, tipeuser });
  }
  getusuario(id: string) {
    return this.http.get<Usuario[]>(this.URI + `/${id}`);
  }
  deleteusuarios(id: string) {
    return this.http.delete<Usuario[]>(`${this.URI}/${id}`);
  }
}
