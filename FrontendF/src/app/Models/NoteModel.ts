export class NoteModel{

    constructor(_id = "", colors = [""], notes = [{Title:" ",description: " ",final_time: " ",initial_time: " ", dia: 0, color: " ", id_note:0 }]) {
        this._id = _id;
        this.colors = colors;
        this.notes = notes;
      }

    _id : string;
    colors: string[];
    notes: Array<Note> 
}
export class Note{  
    constructor(Title=" ",description= " ",final_time= " ",initial_time= " ", dia= 0, color= " ", id_note= 0 ) {
        this.Title = Title;
        this.description = description;
        this.final_time = final_time;
        this.initial_time = initial_time;
        this.dia = dia;
        this.color = color;
        this.id_note= id_note
      } 
    id_note: number
    Title: string
    description: string
    final_time: string
    initial_time: string 
    dia: number   
    color: string
}