import { Component, OnInit, ViewChild } from '@angular/core';
import { establecer_fecha } from './clases_orrganizer'

declare var M: any;

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})

export class OrganizerComponent implements OnInit {

   public dia: Array<string>
   public dia_mes: Array<string>
   public ano: number 

   private  btn_create_note: Element
   private  overlay:Element
  
  constructor() {
 
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems,{ indicators: true});
    });

  }


  ngOnInit(): void {

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
  }


    /*--------------------------------------------------------------------------------------
    funciones para oculatar o mostrar la ventana de create note
    --------------------------------------------------------------------------------------*/
    mostrar(){
      this.overlay = document.getElementById("overlay")
      this.overlay.classList.add("active")
    }

}
