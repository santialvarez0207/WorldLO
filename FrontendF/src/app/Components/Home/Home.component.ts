import { Component, OnInit } from '@angular/core';
import { PageService } from "../../services/Page.service";
import { Page } from 'src/app/Models/page';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
declare var M: any;
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  providers: [PageService]
})
export class HomeComponent implements OnInit {
  page: Page[] = [];
  declare h: number;
  declare i: number;
  srt: string;


  constructor(public pageService: PageService, private router: Router) { }
  getPaginas() {
    this.pageService.getPaginas().subscribe(res => {
      this.pageService.page = res as Page[];
    })
  }


  generado() {
    console.log("Prueba exitosa");
    this.pageService.getPaginas().subscribe(res => {
      this.pageService.page = res as Page[];
      this.h = this.pageService.page.length;

      if (this.i + 5 <= this.h) { // i es la pagina actual y H es la maxima cantidad de paginas
        for (this.i; this.i <= this.i + 5; this.i++) {
          var a = res[this.i].intro;
          this.srt = 'http://localhost:3000/' + res[this.i].imgUrl;
          this.Imagen(this.srt, res[this.i]._id,a,res[this.i].title);
        }
      } else {
        this.Imagen("http://localhost:3000/Storage\\Notfound.png", "","Error","Error");
      }
    })
  }

  ngOnInit() {
    this.i = 0;
    this.h = 0;
    this.generado();
    var a = localStorage.getItem("name")
    if (a == "") {
      M.toast({ html: 'register, is very funny' });
    }
  }

  Imagen(a: string, id: string,b:string, title:string) {
    let div = document.createElement('div');
    div.style.width= "70%"
    div.style.marginLeft = "2%";
    div.className ="card small"
    div.onclick = function tata() {
      window.location.replace('./Paginas/' + id);
    }
    document.getElementById("Homegenerator").appendChild(div);
    // let x = document.createElement('div', { is: 'a' });
    // // x.
    // div.appendChild(x);
    let Imagen = document.createElement('img');
    Imagen.className ="card-image"
     Imagen.src = a;
     Imagen.style.display = "inline-block";
     Imagen.style.left="2%"
     Imagen.style.width = "20%";
     Imagen.style.height= "100%"
    
     div.appendChild(Imagen);

    // x = document.createElement('div', { is: 'a' });
    // x.className ="card-content "
    // x.style.display = "inline-block";
    // x.style.width = "65%";
    // div.appendChild(x);
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
}

