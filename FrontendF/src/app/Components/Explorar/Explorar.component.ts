import { Component, OnInit } from "@angular/core";
import { PageService } from "../../services/Page.service";
import { GroupService } from "../../services/Group.service";
import { Page } from "src/app/Models/page";
import { Group } from "src/app/Models/Group";
import { AppComponent } from "../../app.component";
import { Router } from "@angular/router";
declare var M: any;
@Component({
  selector: "app-Home",
  templateUrl: "./Explorar.component.html",
  styleUrls: ["./Explorar.component.css"],
  providers: [PageService, GroupService],
})
export class Explorarcomponent implements OnInit {
  page: Page[] = [];
  declare h: number;
  declare i: number;
  srt: string;
  busqueda: number = 1;
  valor: string = "0";
  titulo: string = "";

  constructor(
    public pageService: PageService,
    private router: Router,
    public groupService: GroupService
  ) {}
  getPaginas() {
    // toma  todas las paginas de la base de datos
    this.pageService.getPaginas().subscribe((res) => {
      this.pageService.page = res as Page[];
    });
  }

  grupos() {
    // para cambiar el titulo de busqueda,Cambia de paginas a grupos
    let bus = document.getElementById("buscador");
    bus.style.visibility = "hidden";
    let eliminar = document.getElementById("Homegenerator"); //elimina el contenido
    eliminar.remove();
    let sector = document.createElement("div");
    sector.id = "Homegenerator";
    document.getElementById("Homegenerator1").appendChild(sector); // lo vuelve a crear con nuevo contenido
    this.busqueda = 2; // 1 paginas 2 grupos
    this.h = 0;
    this.i = 0;
    this.Actual("Groups"); //colocar el titulo
    this.Prueba1();
  }

  paginas() {
    // para cambiar el titulo de busqueda,Cambia de grupos a paginas
    let bus = document.getElementById("buscador");
    bus.style.visibility = "visible";
    let eliminar = document.getElementById("Homegenerator");
    eliminar.remove();
    let sector = document.createElement("div");
    sector.id = "Homegenerator";
    document.getElementById("Homegenerator1").appendChild(sector);
    this.busqueda = 1; // 1 paginas 2 grupos
    this.h = 0;
    this.i = 0;
    this.Actual("Pages"); //colocar el titulo
    this.Prueba1();
  }
  clasificacion() {
    //tomar los valores, input text - lista
    let valor = <HTMLSelectElement>document.getElementById("categoria");
    this.valor = valor.value;
    let titulo = <HTMLSelectElement>document.getElementById("title");
    this.titulo = titulo.value.toLowerCase();
    if (this.busqueda == 1) {
      this.paginas();
    }
    if (this.busqueda == 2) {
      this.grupos();
    }
  }

  Prueba1() {
    // segun lo que este pagina o grupos, mediante el scrolling se genera lo que corresponda y si no hay mas en la base de datos se genera una predeterminado de error
    if (this.busqueda == 1) {
      this.pageService.getPaginas().subscribe((res) => {
        this.pageService.page = res as Page[];
        this.h = this.pageService.page.length; //mira la cantidad de paginas creadas

        if (this.i + 5 <= this.h) {
          // si es 1 es pagina
          for (this.i; this.i <= this.i + 5; ) {
            let titulo = res[this.i].title.toLowerCase();
            if (
              ((this.valor == res[this.i].like1 ||
                this.valor == res[this.i].like2 ||
                this.valor == res[this.i].like3 ||
                this.valor == "0") &&
                this.titulo == "") ||
              (titulo.indexOf(this.titulo) >= 0 && this.titulo != "")
            ) {
              // buscar
              var a = res[this.i].intro;
              this.srt = "http://localhost:3000/" + res[this.i].imgUrl;
              this.Imagen(
                this.srt,
                "./Paginas/" + res[this.i]._id,
                a,
                res[this.i].title,
                res[this.i].ussename
              ); //llama funcion imagen
            }
            this.i++;
          }
        } else {
          this.Imagen(
            "http://localhost:3000/Storage\\Notfound.png",
            "",
            "Error",
            "Error",
            "Error"
          );
        }
      });
    } else {
      this.groupService.getGroups().subscribe((res) => {
        // si es 2  es grupo
        let x = res as Group[];
        this.h = x.length;

        if (this.i + 5 <= this.h) {
          for (this.i; this.i <= this.i + 5; this.i++) {
            this.srt = "http://localhost:3000/" + res[this.i].imgUrl;
            this.Imagen(
              this.srt,
              "./Group/" + x[this.i]._id,
              x[this.i].Description,
              res[this.i].Name,
              res[this.i].ussename
            );
          }
        } else {
          this.Imagen(
            "http://localhost:3000/Storage\\Notfound.png",
            "",
            "Error",
            "Error",
            "Error"
          );
        }
      });
    }
  }

  ngOnInit() {
    // al iniciar se pre establece que esta en paginas
    this.i = 0;
    this.h = 0;

    var a = localStorage.getItem("name");
    if (a == "") {
      M.toast({ html: "register, is very funny" });
    } //spam
    let sector = document.createElement("div");
    sector.id = "Homegenerator";
    document.getElementById("Homegenerator1").appendChild(sector);
    this.paginas();

    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems);
    });
  }

  Imagen(a: string, id: string, b: string, title: string, autor: string) {
    //genra cada seccion
    let mayorm = document.createElement("div");
    mayorm.className = "";
    mayorm.style.marginLeft = "1.42%";
    mayorm.style.width = "15%";
    mayorm.style.height = "30%";
    mayorm.style.display = "inline-block";
    mayorm.style.zIndex = "9";
    document.getElementById("Homegenerator").appendChild(mayorm); //nada

    let mayor = document.createElement("div");
    mayor.className = "card";
    mayorm.appendChild(mayor);
    let div = document.createElement("div");
    div.className = "card-image waves-effect waves-block waves-light"; // para mostrar la imagen
    mayor.appendChild(div);
    let imagen = document.createElement("img");
    imagen.src = a;
    imagen.style.height = "10%";
    imagen.className = "activator";
    div.appendChild(imagen); // creamos la imagen, portada

    div = document.createElement("div");
    div.className = "card-content";
    mayor.appendChild(div); // donde va el contenido
    let span = document.createElement("span");
    span.className = "card-title activator grey-text text-darken-4";
    span.innerHTML = title;
    div.appendChild(span); //titulo

    let icono = document.createElement("i");
    icono.className = "material-icons right ";
    icono.style.fontSize = "35px";
    icono.innerHTML = "pageview";
    icono.onclick = function tata() {
      window.location.replace(id); // lo lleva a la pagina
    };
    span.appendChild(icono); //icono

    let p = document.createElement("p");
    p.innerHTML = autor;
    div.appendChild(p); // se agrega el subtitulo autor

    div = document.createElement("div");
    div.className = "card-reveal";
    mayor.appendChild(div); // menu oculto
    span = document.createElement("span");
    span.className = "card-title grey-text text-darken-4";
    span.innerHTML = title;
    div.appendChild(span); //mostrar titulo
    icono = document.createElement("i");
    icono.className = "material-icons right";
    icono.innerHTML = "close";
    span.appendChild(icono); //icono cerrar
    p = document.createElement("p");
    p.innerHTML = b; //introduccion
    div.appendChild(p);
  }

  Actual(b: string) {
    //genera el titulo
    let Texto = document.createElement("h2");
    Texto.className = "card-content";
    Texto.textContent = b;
    Texto.style.color = "#3c0074";
    Texto.style.marginLeft = "46%";
    Texto.style.wordWrap = "break-word";
    document.getElementById("Homegenerator").appendChild(Texto);
  }
}
