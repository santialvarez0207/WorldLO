import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Soli } from "../Models/Solis";
@Injectable({
  providedIn: "root",
})
export class SolisService {
  usuario: Soli[];
  readonly URI = "http://localhost:3000/api/solis";
  readonly URIL = "http://localhost:3000/api/clave";
  constructor(private http: HttpClient) {}

  getsolis() {
    return this.http.get<Soli[]>(this.URI);
  }
  clave(clave: string) {
    return this.http.post<string>(this.URIL, { clave });
  }
  postsoli(
    name: string,
    mail: string,
    uid: string,
    fechan: String,
    fechas: String,
    imagenes: Array<string>,
    dato: Array<string>
  ) {
    return this.http.post(this.URI, {
      name,
      uid,
      mail,
      fechan,
      fechas,
      imagenes,
      dato,
    });
  }

  putsoli(
    _id: string,
    name: string,
    mail: string,
    uid: string,
    fechan: String,
    fechas: String,
    imagenes: Array<string>,
    dato: Array<string>
  ) {
    return this.http.put<Soli[]>(this.URI + `/${_id}`, {
      name,
      uid,
      mail,
      fechan,
      fechas,
      imagenes,
      dato,
    });
  }
  getsoli(id: string) {
    return this.http.get<Soli>(this.URI + `/${id}`);
  }
  deletesoli(id: string) {
    return this.http.delete<Soli[]>(`${this.URI}/${id}`);
  }
}
