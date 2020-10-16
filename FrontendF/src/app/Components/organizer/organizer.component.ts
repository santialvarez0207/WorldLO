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
       })
      console.log(this.User)
      
      if(this.ServiceNote.getUSerNote(localStorage.getItem("id"))._isScalar){
        return true;
      }else{
        return false;
      }
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
      this.ServiceNote.postEmployee(User)
        .subscribe(res => {console.log(res)})
    }
    addNote(){
      
      if(this.verificarExistencia()){
        
      }else{

      }
    }


}
