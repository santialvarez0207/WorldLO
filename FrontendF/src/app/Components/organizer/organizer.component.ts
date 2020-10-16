import { Component, OnInit, ViewChild } from '@angular/core';
import { establecer_fecha } from './clases_orrganizer'
import {NoteServiceService} from '../../services/note-service.service'
import { NoteModel, Note } from '../../Models/NoteModel';

declare var M: any;

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css'],
  providers: [NoteServiceService]
})

export class OrganizerComponent implements OnInit {

   public dia: Array<string>
   public dia_mes: Array<string>
   public ano: number 

   private  btn_create_note: Element
   private  overlay:Element

   User:NoteModel


  constructor(private ServiceNote: NoteServiceService) {

  }


  ngOnInit(): void {

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems,{ indicators: true});
    });

    /*--------------------------------------------------------------------------------------
    codigo para establecer la fecha en el carrusel (contiene una importacion de ./clases_orrganizer)
    --------------------------------------------------------------------------------------*/
    let fecha = new establecer_fecha()
    
    this.dia = fecha.Nombre_dia()
    this.dia_mes = fecha.dia_mes()
    this.ano = fecha.año
    console.log(this.dia)

    /*--------------------------------------------------------------------------------------
    codigo para oculatar o mostrar la ventana de create note
    --------------------------------------------------------------------------------------*/
    this.btn_create_note = document.getElementById("create_note")
    this.btn_create_note.addEventListener('click',this.mostrar);

    this.btn_create_note = document.getElementById("cerrar-pop_up")
    this.btn_create_note.addEventListener('click',this.cerrar);
  }


    /*--------------------------------------------------------------------------------------
    funciones para oculatar o mostrar la ventana de create note
    --------------------------------------------------------------------------------------*/
    mostrar(){
      this.overlay = document.getElementById("overlay")
      this.overlay.classList.add("active")
    }
    cerrar(){
      this.overlay = document.getElementById("overlay")
      this.overlay.className = "overlay"
    }
    /*--------------------------------------------------------------------------------------
    funciones para el formulario
    --------------------------------------------------------------------------------------*/

    verificarExistencia(){
      this.ServiceNote.getUSerNote(localStorage.getItem("id"))
        .subscribe(res => {
         this.User = res as NoteModel
         if(this.User){
          return true;
          
        }else{
          this.crearUserNote()
        }
       })
    }
    
    crearUserNote(){
      const ValorTitle= (<HTMLInputElement>document.getElementById("Title")).value;
      console.log(ValorTitle)
      const ValorDescription = (<HTMLInputElement>document.getElementById("description")).value;
      console.log(ValorDescription)
      const ValorTimeInicial= (<HTMLInputElement>document.getElementById("TimeInicial")).value;
      console.log(ValorTimeInicial)
      const ValorTimeFinal= (<HTMLInputElement>document.getElementById("TimeFinal")).value;
      console.log(ValorTimeFinal)
      console.log(typeof ValorTimeFinal)
      const ValorcolorOfNote= (<HTMLInputElement>document.getElementById("colorOfNote")).value;
      console.log(ValorcolorOfNote)
      
      let NoteSelect = new Note
      NoteSelect.Title= ValorTitle
      NoteSelect.description= ValorDescription
      NoteSelect.initial_time= ValorTimeInicial
      NoteSelect.final_time = ValorTimeFinal
      NoteSelect.color = ValorcolorOfNote
      NoteSelect.id_note= Math.round(Math.random()*10000)
      console.log(NoteSelect)
      
      
      let User = new NoteModel
      User._id = localStorage.getItem("id")
      User.notes= [NoteSelect]
      if(ValorcolorOfNote != "#ffffff"){
        User.colors= [ValorcolorOfNote]
      }
      console.log(User)
      this.ServiceNote.postUserNote(User)
        .subscribe(res => {console.log(res)
          this.CreateNoteHTML(NoteSelect)
          this.cerrar()
        })
        
      
    }

    putUserNote(){
      const ValorTitle= (<HTMLInputElement>document.getElementById("Title")).value;
      const ValorDescription = (<HTMLInputElement>document.getElementById("description")).value;
      const ValorTimeInicial= (<HTMLInputElement>document.getElementById("TimeInicial")).value;
      const ValorTimeFinal= (<HTMLInputElement>document.getElementById("TimeFinal")).value;
      const ValorcolorOfNote= (<HTMLInputElement>document.getElementById("colorOfNote")).value;
    }

    CreateNoteHTML(Note: Note){


      let Divcard = document.createElement("div");
      Divcard.style.margin = "4px 2% 4px 2%";
      Divcard.style.width = "96%";
      Divcard.style.backgroundColor = Note.color;
      Divcard.className = "card";
      


      let DivTitulo = document.createElement("div");
      DivTitulo.style.width = "100%";
      DivTitulo.style.backgroundColor = Note.color;
      DivTitulo.className= "card-content"
      let spanTitulo = document.createElement("span");
      spanTitulo.className = "card-title activator grey-text text-darken-4";
      let contenidoDivTitulo = document.createTextNode(Note.Title)
      spanTitulo.appendChild(contenidoDivTitulo);
      DivTitulo.appendChild(spanTitulo)
      
      let Divfecha = document.createElement("div");
      Divfecha.style.width = "100%";
      Divfecha.style.margin = "4px 0px 4px 0px";
      Divfecha.style.backgroundColor = Note.color;
      Divfecha.className = "card-title activator grey-text text-darken-4";
      let contenidoHora = document.createTextNode(" de " + Note.initial_time + " a " + Note.final_time)
      Divfecha.appendChild(contenidoHora );
      DivTitulo.appendChild(Divfecha)
      Divcard.appendChild(DivTitulo)

      let Divdescription = document.createElement("div")
      Divdescription.className = "card-reveal"
      let spandescription = document.createElement("p")
      spandescription.style.width = "96%";
      spandescription.style.margin = "4px 2% 4px 2%";
      spandescription.className = "card-revealgrey-text text-darken-4 "
      let contenido = document.createTextNode(Note.description)
      spandescription.appendChild(contenido)
      Divdescription.appendChild(spandescription)
      Divcard.appendChild(Divdescription)

      const bandeja= document.getElementById("bandeja")
      bandeja.appendChild(Divcard)
    }

    comakk(dia:Number){
      const bandeja= document.getElementById("bandeja")
      if(dia==0){

      }
    } 

    addNote(){
      this.verificarExistencia()
    }


}
