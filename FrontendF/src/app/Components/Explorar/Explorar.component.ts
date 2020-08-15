import { Component, OnInit } from '@angular/core';
import { PageService } from "../../services/Page.service";
import { GroupService } from "../../services/Group.service";
import { Page } from 'src/app/Models/page';
import { Group } from 'src/app/Models/Group';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-Home',
  templateUrl: './Explorar.component.html',
  styleUrls: ['./Explorar.component.css'],
  providers: [PageService,GroupService]
})
export class Explorarcomponent implements OnInit {
  page: Page[] = [];
  declare h: number;
  declare i: number;
  srt: string;
  busqueda: number=1;


  constructor(public pageService: PageService, private router: Router,public groupService: GroupService) { }
  getPaginas() { // toma  todas las paginas
    this.pageService.getPaginas().subscribe(res => {
      this.pageService.page = res as Page[];
    })

  }

 grupos (){ // para cambiar el titulo de busqueda,Cambia de paginas a grupos

   let eliminar = document.getElementById('Homegenerator');
   eliminar.remove();
   let sector = document.createElement('div');
   sector.id = "Homegenerator"
   document.getElementById("Homegenerator1").appendChild(sector);
   this.busqueda = 2;
   this.h=0;
   this.i=0;
   this.Actual("Groups");
   this.Prueba1();
 }

 paginas (){// para cambiar el titulo de busqueda,Cambia de grupos a paginas
  let eliminar = document.getElementById('Homegenerator');
  eliminar.remove();
  let sector = document.createElement('div');
  sector.id = "Homegenerator"
  document.getElementById("Homegenerator1").appendChild(sector);
 this.busqueda = 1;
 this.h=0;
 this.i=0;
 this.Actual("Pages");
 this.Prueba1();

 }

  Prueba1() { // segun lo que este pagina o grupos, mediante el scrolling se genera lo que corresponda y si no hay mas en la base de datos se genera una predeterminado de error
    if (this.busqueda==1){
    this.pageService.getPaginas().subscribe(res => {
      this.pageService.page = res as Page[];
      this.h = this.pageService.page.length;

      if (this.i + 5 <= this.h) { // si es 1 es pagina
        for (this.i; this.i <= this.i + 5; this.i++) {
          var a = res[this.i].intro;
          this.srt = 'http://localhost:3000/' + res[this.i].imgUrl;
          this.Imagen(this.srt, './Paginas/' + res[this.i]._id,a,res[this.i].title);
        }
      } else {
        this.Imagen("http://localhost:3000/Storage\\Notfound.png", "","Error","Error");
      }
    })
  }else{
    this.groupService.getGroups().subscribe(res => { // si es 2  es grupo
      let x = res as Group[];
      this.h = x.length;

      if (this.i + 5 <= this.h) {
        for (this.i; this.i <= this.i + 5; this.i++) {
          this.srt = 'http://localhost:3000/' + res[this.i].imgUrl;
          this.Imagen(this.srt,  './Group/' + x[this.i]._id,x[this.i].Description,res[this.i].Name);
        }
      } else {
        this.Imagen("http://localhost:3000/Storage\\Notfound.png", "","Error","Error");
      }
    })
  }

  }

  ngOnInit() { // al iniciar se pre establece que esta en paginas
    this.i = 0;
    this.h = 0;
 
    var a = localStorage.getItem("name")
    if (a == "") {
      M.toast({ html: 'register, is very funny' });
    }
    let sector = document.createElement('div');
    sector.id = "Homegenerator"
    document.getElementById("Homegenerator1").appendChild(sector);
    this.paginas();
  }

  Imagen(a: string, id: string,b:string, title:string) { //genra cada seccion 
    let div = document.createElement('div');
    
    div.style.width= "70%"
    div.style.marginLeft = "2%";
    div.className ="card small"
    div.onclick = function tata() {
      window.location.replace( id);
    }
    document.getElementById("Homegenerator").appendChild(div);
    let Imagen = document.createElement('img');
    Imagen.className ="card-image"
     Imagen.src = a;
     Imagen.style.display = "inline-block";
     Imagen.style.left="2%"
     Imagen.style.width = "20%";
     Imagen.style.height= "100%"
    
     div.appendChild(Imagen);

    let Texto = document.createElement('p');
    Texto.className="card-content"
    if (b.length > 700  ){}
    Texto.textContent = b;

    Texto.style.display = "inline-block";
    Texto.style.width = "60%";
    Texto.style.height= "100%"
    Texto.style.wordWrap = "break-word";
    div.appendChild(Texto);

     let titl = document.createElement('h4');
     titl.textContent = title;
    titl.className ="card-action"
    div.appendChild(titl);
  }

  Actual(b:string){//genera el titulo
    let Texto = document.createElement('h3');
    Texto.className="card-content"
    Texto.textContent = b;
    Texto.style.display = "inline-block";
    Texto.style.color="#581845";
    Texto.style.marginLeft="2%";
    Texto.style.width = "60%";
    Texto.style.height= "100%";
    Texto.style.wordWrap = "break-word";
    document.getElementById("Homegenerator").appendChild(Texto);
  }
}