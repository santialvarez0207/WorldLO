import { Component, OnInit, ViewChild } from '@angular/core';
import { establecer_fecha } from './clases_orrganizer'
import {NoteServiceService} from '../../services/note-service.service'
import { NoteModel, Note } from '../../Models/NoteModel';
import { relative } from 'path';

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
    public solodia: Array<number>
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
    this.solodia = fecha.solo_diames
    console.log(this.dia)

    /*--------------------------------------------------------------------------------------
    codigo para oculatar o mostrar la ventana de create note
    --------------------------------------------------------------------------------------*/
    this.btn_create_note = document.getElementById("create_note")
    this.btn_create_note.addEventListener('click',this.mostrar);

    this.btn_create_note = document.getElementById("cerrar-pop_up")
    this.btn_create_note.addEventListener('click',this.cerrar);
    /*--------------------------------------------------------------------------------------
    codigo para ubicar notas
    --------------------------------------------------------------------------------------*/
    this.establecerDrops()
    this.ubiacion_De_Inicio()
    
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
    
    ubicacion(dia:number , div: HTMLElement,id:number){
      let eliminar:boolean = true;
      console.log("llego a la funcion de ubicacion, el dia es "+dia+" el id es "+id +" div es " + div )
      if(dia == 0){
        const bandeja_0= document.getElementById("bandeja")
        bandeja_0.appendChild(div)
        eliminar = false

      }else{
      for(let i=0; i<5; i++){
        console.log("dia del for= "+ this.solodia[i] + ", el dia es = " + dia )
        console.log(this.solodia[i] == dia )
        if( this.solodia[i] == dia){
          let idCaja = 'caja_drop'+(i+1)
          const bandeja= document.getElementById(idCaja)
          bandeja.appendChild(div)
          eliminar = false
          console.log("entro")
        }
      }}  
      if(eliminar==true){
        this.eliminarNote(id)
      }
    } 

    
    CreateNoteHTML(Note: Note){

      //creacion de la card madre
      let Divcard = document.createElement("div");
      Divcard.style.margin = "4px 2% 4px 2%";
      Divcard.style.width = "96%";
      Divcard.style.padding = "0px";
      Divcard.style.backgroundColor = Note.color;
      Divcard.id = Note.id_note.toString()
      Divcard.draggable = true
      Divcard.className = "card";
      

      //creacion de la zona adonde va el titulo
      let DivTitulo = document.createElement("div");
      DivTitulo.style.width = "100%";
      DivTitulo.style.backgroundColor = Note.color;
      DivTitulo.className= "card-content"
      DivTitulo.style.padding = "0px";
      //creacion del titulo
      let spanTitulo = document.createElement("span");
      spanTitulo.className = "card-title activator ";
      let contenidoDivTitulo = document.createTextNode(Note.Title)    
      //se añade el titulo a la zona
      spanTitulo.appendChild(contenidoDivTitulo);
      DivTitulo.appendChild(spanTitulo)
      
      //creacion de la zona Fecha
      let Divfecha = document.createElement("div");
      Divfecha.style.width = "100%";
      Divfecha.style.margin = "4px 0px 4px 0px";
      Divfecha.style.backgroundColor = Note.color;
      Divfecha.className = "card-title activator";
      //creacion de la fecha
      let contenidoHora = document.createTextNode(" de " + Note.initial_time + " a " + Note.final_time)
      //se añade la fecha a la zona de fecha
      Divfecha.appendChild(contenidoHora );
      if(Note.color== "#ffffff"){
        DivTitulo.style.color= "#000000"
        Divfecha.style.color= "#000000"
      }else{
        DivTitulo.style.color= "#ffffff"
        Divfecha.style.color= "#ffffff"
      }
      DivTitulo.appendChild(Divfecha)
      Divcard.appendChild(DivTitulo)
      
      //creacion de la zona descripcion
      let Divdescription = document.createElement("div")
      Divdescription.className = "card-reveal"
      //titulo de description
      let spandes = document.createElement("span");
      spandes.className = "card-title ";
      let contenidodescription = document.createTextNode("description:")
      spandes.appendChild(contenidodescription);
      Divdescription.appendChild(spandes)    
      //creacion de span description
      let spandescription = document.createElement("p")
      spandescription.style.width = "96%"
      spandescription.style.margin = "4px 2% 4px 2%"
      spandescription.className = "card-revealgrey-text "
      //creacion de la description 
      let contenido = document.createTextNode(Note.description)
      spandescription.appendChild(contenido)
      Divdescription.appendChild(spandescription)
      
      let IDdivCard = document.createElement("p")
      let ID = document.createTextNode(Note.id_note.toString())
      IDdivCard.style.visibility ="hidden"
      IDdivCard.style.position = "relative"
      IDdivCard.style.top ="5px"
      IDdivCard.appendChild(ID)
      
      Divcard.appendChild(Divdescription)
      Divcard.appendChild(IDdivCard)
      Divcard.addEventListener("dragstart",e =>{
        e.dataTransfer.setData("id", (e.target).id)
      })

      this.ubicacion(Note.dia,Divcard,Note.id_note)
      
    }

    obtencionDeDatos(){
      const ValorTitle= (<HTMLInputElement>document.getElementById("Title")).value;
      const ValorDescription = (<HTMLInputElement>document.getElementById("description")).value;
      const ValorTimeInicial= (<HTMLInputElement>document.getElementById("TimeInicial")).value;
      const ValorTimeFinal= (<HTMLInputElement>document.getElementById("TimeFinal")).value;
      const ValorcolorOfNote= (<HTMLInputElement>document.getElementById("colorOfNote")).value;

      let NoteSelect = new Note
      NoteSelect.Title= ValorTitle
      NoteSelect.description= ValorDescription
      NoteSelect.initial_time= ValorTimeInicial
      NoteSelect.final_time = ValorTimeFinal
      NoteSelect.color = ValorcolorOfNote
      NoteSelect.id_note= Math.round(Math.random()*10000)
      console.log(NoteSelect)
      return NoteSelect
    }

    ubiacion_De_Inicio(){
      this.ServiceNote.getUSerNote(localStorage.getItem("id"))
      .subscribe(res => {
       this.User = res as NoteModel
       for(let i = 0; i < this.User.notes.length; i++){
        this.CreateNoteHTML(this.User.notes[i])
       }    
     })
    }
       
    /*--------------------------------------------------------------------------------------
    las opciones de add
    --------------------------------------------------------------------------------------*/
    crearUserNote(){
      let NoteSelect= new Note
      NoteSelect = this.obtencionDeDatos()
      
      let User = new NoteModel
      User._id = localStorage.getItem("id")
      User.notes= [NoteSelect]
      if(NoteSelect.color != "#ffffff"){
        User.colors= [NoteSelect.color]
      }
      console.log(User)
      this.ServiceNote.postUserNote(User)
        .subscribe(res => {console.log(res)
          this.CreateNoteHTML(NoteSelect)
          this.cerrar()
        }) 
    }

    putUserNote(){
      let NoteSelect= new Note
      NoteSelect = this.obtencionDeDatos()
      this.User.notes.unshift(NoteSelect)
      this.ServiceNote.putNore(this.User)
        .subscribe(res => {console.log(res)
          this.CreateNoteHTML(NoteSelect)
          this.cerrar()
        }) 
    }

    eliminarNote(idNote: Number){
      let ubicacion = this.User.notes.indexOf(this.User.notes.find(e => {return e.id_note == idNote}))
      this.User.notes.splice(ubicacion,1)
      this.ServiceNote.putNore(this.User)
      console.log("se elimino");
      console.log(idNote);
    }

    // Add-------------------------------------------------------
  
    addNote(){
      if(this.User){
        this.putUserNote()
        
      }else{
        this.crearUserNote()
      }
    }


    establecerDrops(){
      for(let i = 1; i<6; i++){
        
        let idDiv = "caja_drop" + i 
        let DivContenedor = document.getElementById(idDiv)
        
        DivContenedor.addEventListener("dragover",e => {
          e.preventDefault();
        })
        DivContenedor.addEventListener("drop",e=> {
          e.preventDefault();
          let id_card= e.dataTransfer.getData("id");
          DivContenedor.appendChild(document.getElementById(id_card))

          let Nota_para_cambiar = this.User.notes.find(e => {return e.id_note == parseInt(id_card)})
          let ubicacion = this.User.notes.indexOf(Nota_para_cambiar)
          Nota_para_cambiar.dia = this.solodia[i-1]
          console.log(this.User)
          this.User.notes.splice(ubicacion,1,Nota_para_cambiar)
          
          this.ServiceNote.putNore(this.User)
          .subscribe(res => {console.log(res)
            alert(Nota_para_cambiar + " " + ubicacion)
            console.log(this.User)
          }) 

        })

      }
    }

}


