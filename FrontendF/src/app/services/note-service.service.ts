import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NoteModel, Note } from '../Models/NoteModel';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  SelecteUserNote: NoteModel;
  SelecteNote:Note
  
  URL_API = "http://localhost:3000/api/Note";
  constructor(private http: HttpClient) { 
    this.SelecteUserNote = new NoteModel();
    this.SelecteNote= new Note()
  }

   getUSerNote(Userid:string){
    let URL= this.URL_API +`/${Userid}`
    return this.http.get(URL);
  }

  postUserNote(UserNote:NoteModel) {
    console.log(UserNote)
    return this.http.post(this.URL_API, UserNote);
  }

  putNore(UserNote:NoteModel) {
    let URL= this.URL_API + `/${UserNote._id}`
    return this.http.put(URL, UserNote);
  }
}
