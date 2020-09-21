import { Component, OnInit, Output, EventEmitter, ɵCurrencyIndex } from '@angular/core';
import { PageService } from "../../services/Page.service"; //1
import { UsuarioService } from "../../services/usuario.service";
import { Page } from 'src/app/Models/Page';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import { Imagenes } from 'src/app/Models/Imagenes';
import { ImagenesService } from "../../services/imagenes.service";


declare var M: any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-Creacion',
  templateUrl: './Creacion.component.html',
  styleUrls: ['./Creacion.component.css'],
  providers: [PageService, UsuarioService, ImagenesService] //2
})
export class Creacioncomponent implements OnInit {
  photoSelected: string | ArrayBuffer;
  file: File;
  usuario: Usuario[] = [];
  contador: number = 1;
  img: Array<string> = [];
  imag: number = 1;
  video: number = 1;
  orden: Array<string> = [];
  ii: number = 0;
  state: boolean = true;
  constructor(public PageService: PageService, private router: Router, public usuarioService: UsuarioService, public imagenservice: ImagenesService) { } //3 son para definir que otros archivos estamos utilizando

  ngOnInit(): void { // para cuando incia 
    var a = localStorage.getItem("name")
    this.usuarioService.getusuarios().subscribe(res => { // hace una verificacion si el usuario esta en la base de datos
      this.usuarioService.usuario = res as Usuario[];
      var h;
      var x: boolean = false;
      h = this.usuarioService.usuario.length;
      for (var i = 0; i <= h - 1; i++) {
        var s = localStorage.getItem("id");
        if (s == res[i]._id) {
          x = true;
          if (res[i].tipeuser != "1" && res[i].tipeuser != "2") {
            M.toast({ html: 'Srry you need be a teacher for create a page srry  ' });
            window.location.replace("./Home")
          }
        }
      }
      if (x == false) {
        M.toast({ html: 'In not database ' });
        window.location.replace("./Home")
        localStorage.setItem("name", "");
        localStorage.setItem("id", "");
        localStorage.setItem("Correo", "")
      }
    })

    if (a == "") {
      M.toast({ html: 'Srry you need stay register for create a new page :D' });
      window.location.replace("./Usuarios")
    }
  }

  onPhotoSelected(event: HtmlInputEvent): void { // para cargar una imagen
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  addpages() {
    //se envia el contenido a la base de datos

    var a: Array<string> = [], c: Array<string> = [], b: Array<File> = [];

    var title = <HTMLInputElement>document.getElementById("title")
    var intro = <HTMLTextAreaElement>document.getElementById("intro")
    var cont = <HTMLTextAreaElement>document.getElementById("cont")
    var like1 = <HTMLSelectElement>document.getElementById("like1")
    var like2 = <HTMLSelectElement>document.getElementById("like2")
    var like3 = <HTMLSelectElement>document.getElementById("like3")


    for (var i = 0; i <= this.contador - 2; i++) {
      let x = <HTMLTextAreaElement>document.getElementById("Parrafe-" + (1 + i));
      a[i] = x.value;
      console.log(x.value)
    }
    for (var i = 0; i <= this.video - 2; i++) {
      let x = <HTMLTextAreaElement>document.getElementById("video-" + (1 + i));
      c[i] = "https://www.youtube.com/embed/" + x.value.slice(32, 45);;
      console.log(c[i])
    }


    for (var i = 1; i <= this.imag - 1; i++) {
      let x = <HTMLInputElement>document.getElementById("imagen-" + i)
      b[i-1] = x.files[0];
    }

    this.imagenservice.postImagenes(b, this.imag - 1).subscribe(res => {
      let ids = res as Imagenes;
      console.log(ids)
      for (var i = 0; i <= this.imag - 2; i++) {
        this.img[i] = ids.U[i].path;
      }
      this.PageService.postPagina(title.value, intro.value, localStorage.getItem("id"), localStorage.getItem("name"), like1.value, like2.value, like3.value, cont.value,
        this.file, a, c, this.orden, this.img, [this.contador, this.video, this.imag, this.ii]).subscribe(res => {
          M.toast({ html: 'Page create :b' });
        });
    })


  }


  AgregarParrafo() { // agrega un parrafo
    let n = document.createElement('div');
    n.id = "BoxParrafe" + (1 + this.contador);
    n.className = "card z-depth-3";
    n.style.color = "#3c0074"
    n.style.width = "70%"
    document.getElementById("sector").appendChild(n);
    let t = document.createElement('h3');
    t.textContent = "Parrafe " + (1 + this.contador);
    t.style.left = "2%"
    t.style.color = "#3c0074"
    t.style.width = "70%"
    n.appendChild(t);
    let a = document.createElement('textarea');
    a.style.width = "100%"
    a.className = "materialize-textarea";
    a.id = "Parrafe-" + (this.contador);
    a.style.left = "2%"
    a.placeholder = "Incert the question o point of the exam"
    a.style.color = "#3c0074"
    n.appendChild(a);
    this.contador++;
    this.ordenfuction(1, "1")
  }

  EliminarParrafo() {//elimina un parrafo
    let y = document.getElementById("BoxParrafe" + (this.contador));
    y.remove()
    this.contador--;
    this.ordenfuction(2, "1")
  }

  AgregarImagen() { // agrega para subir una imagen
    let n = document.createElement('div');
    n.id = "BoxImagen" + (1 + this.imag);
    n.className = "card z-depth-3";
    n.style.color = "#3c0074"
    n.style.width = "70%"
    document.getElementById("sector").appendChild(n);
    let t = document.createElement('h3');
    t.textContent = "Imagen " + (1 + this.imag);
    t.style.left = "2%"
    t.style.color = "#3c0074"
    t.style.width = "70%"
    n.appendChild(t);
    let a = document.createElement('input');
    a.style.width = "100%"
    a.type = "file"
    a.className = "materialize-textarea";
    a.id = "imagen-" + (this.imag);
    a.style.left = "2%"
    a.placeholder = "Incert the question o point of the exam"
    a.style.color = "#3c0074"
    n.appendChild(a);
    this.imag++;
    this.ordenfuction(1, "2")
  }

  Agregarvideo() { // agrega un parrafo
    let n = document.createElement('div');
    n.id = "Boxvideo" + (this.video);
    n.className = "card z-depth-3";
    n.style.color = "#3c0074"
    n.style.width = "70%"
    document.getElementById("sector").appendChild(n);
    let t = document.createElement('h3');
    t.textContent = "video " + (1 + this.video);
    t.style.left = "2%"
    t.style.color = "#3c0074"
    t.style.width = "70%"
    n.appendChild(t);
    let a = document.createElement('textarea');
    a.style.width = "100%"
    a.className = "materialize-textarea";
    a.id = "video-" + (this.video);
    a.style.left = "2%"
    a.placeholder = "Incert the question o point of the exam"
    a.style.color = "#3c0074"
    n.appendChild(a);
    this.video++;
    this.ordenfuction(1, "3")
  }


  Eliminarvideo() {//elimina un parrafo
    let y = document.getElementById("Boxvideo" + (this.video));
    y.remove()
    this.video--;
    this.ordenfuction(2, "3")
  }

  EliminarImagen() {// agrega para eliminar una pagina
    let y = document.getElementById("BoxImagen" + (this.imag));
    y.remove()
    this.imag--;
    this.ordenfuction(2, "2")
  }

  ordenfuction(a: number, b: string) {
    if (a == 1) {
      this.orden[this.ii] = b;
      this.ii++;
    }
    else {
      var state: boolean = false;
      for (var i = this.ii; i >= 0; i--) {
        if (this.orden[i] == b && state == false) {
          for (var r = i; r <= this.ii - 1; r++) {
            this.orden[r] = this.orden[r + 1]
          }
          this.ii--;
          state = true;
        }

      }
    }
  }


}
