import { Component, OnInit, Output,EventEmitter,ɵCurrencyIndex } from '@angular/core';
import { PageService } from "../../services/Page.service"; //1
import { UsuarioService } from "../../services/usuario.service";
import { Page } from 'src/app/Models/Page';
import { AppComponent}from'../../app.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';


declare var M: any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-Creacion',
  templateUrl: './Creacion.component.html',
  styleUrls: ['./Creacion.component.css'],
  providers: [PageService,UsuarioService] //2
})
export class Creacioncomponent implements OnInit  {
  a : Array<string>=[];
  photoSelected: string | ArrayBuffer;
  file: File;
  usuario: Usuario[] = [];
  contador:number=1; 
  imag:number=1;

 state: boolean = true;
  constructor(public PageService:PageService, private router:Router,public usuarioService:UsuarioService) { } //3 son para definir que otros archivos estamos utilizando

  ngOnInit(): void { // para cuando incia 
    var xd;
    
    var a =localStorage.getItem("name")
    this.usuarioService.getusuarios().subscribe(res=>{ // hace una verificacion si el usuario esta en la base de datos
      this.usuarioService.usuario = res as Usuario[];
      var h;
      var x : boolean = false;
      h = this.usuarioService.usuario.length;

      for(var i=0;i<=h-1;i++){
        var s =localStorage.getItem("id");
        if (s ==res[i]._id){
          x=true;
          if (res[i].tipeuser != "1" && res[i].tipeuser != "2" ){
            M.toast({html: 'Srry you need be a teacher for create a page srry  '});
            window.location.replace("./Home")
          }
        }
        }
        if (x == false){
          M.toast({html: 'In not database '});
            window.location.replace("./Home")
            localStorage.setItem("name","");
            localStorage.setItem("id","");
            localStorage.setItem("Correo","")
      }
    })

    if (a == ""){
      M.toast({html: 'Srry you need stay register for create a new page :D'});
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

  addpages(title: HTMLInputElement,intro:HTMLTextAreaElement,cont:HTMLTextAreaElement,like1:HTMLSelectElement,like2:HTMLSelectElement,like3:HTMLSelectElement){ 
    //se envia el contenido a la base de datos
    if (this.state == false){
      for (var i ; i<= this.contador;i++){
let x =<HTMLTextAreaElement>document.getElementById("Parrafe-"+(1+i));
this.a[i]=x.value;
}
  this.PageService.postPagina(title.value,intro.value, localStorage.getItem("id"),localStorage.getItem("name"),like1.value,like2.value,like3.value,cont.value,this.file,this.a).subscribe(res =>{ 
  M.toast({html:'Page create :b'});
 });
    
  
    }
  }

  
  getpages(){
this.PageService.getPaginas().subscribe(res=>{
this.PageService.page= res as Page[];
})
  }



AgregarParrafo(){ // agrega un parrafo
  let n = document.createElement('div');
  n.id="BoxParrafe"+(1+this.contador);
  n.className="card z-depth-3";
  n.style.color="#581845"
  n.style.width = "70%"
  document.getElementById("sector").appendChild(n);
  let t = document.createElement('h3');
  t.textContent="Parrafe "+(1+this.contador);
  t.style.left = "2%"
  t.style.color="#581845"
  t.style.width = "70%"
  n.appendChild(t);
  let a = document.createElement('textarea');
  a.style.width="100%"
  a.className="materialize-textarea";
  a.id="Parrafe-"+(1+this.contador);
  a.style.left = "2%"
  a.placeholder="Incert the question o point of the exam"
  a.style.color="#581845"
  n.appendChild(a);
this.contador++;
}

EliminarParrafo (){//elimina un parrafo
let y =document.getElementById("BoxParrafe"+(this.contador));
y.remove()
this.contador--;
}

AgregarImagen(){ // agrega para subir una imagen
  let n = document.createElement('div');
  n.id="BoxImagen"+(1+this.imag);
  n.className="card z-depth-3";
  n.style.color="#581845"
  n.style.width = "70%"
  document.getElementById("sector").appendChild(n);
  let t = document.createElement('h3');
  t.textContent="Imagen "+(1+this.imag);
  t.style.left = "2%"
  t.style.color="#581845"
  t.style.width = "70%"
  n.appendChild(t);
  let a = document.createElement('input');
  a.style.width="100%"
  a.type="file"
  a.className="materialize-textarea";
  a.id="Parrafe-"+(1+this.imag);
  a.style.left = "2%"
  a.placeholder="Incert the question o point of the exam"
  a.style.color="#581845"
  n.appendChild(a);
this.imag++;
}

EliminarImagen (){// agrega para eliminar una pagina
let y =document.getElementById("BoxImagen"+(this.imag));
y.remove()
this.imag--;
}




verificacion(title: HTMLInputElement,intro:HTMLTextAreaElement,cont:HTMLTextAreaElement,like1:HTMLSelectElement,like2:HTMLSelectElement,like3:HTMLSelectElement){
  //esto verifica si la pagina cumple el requisito de que la introduccion tenga menos de 700 caracteres
  this.PageService.getPaginas().subscribe(res=>{
  this.state = false;
  
if (intro.value.length > 700  ){
M.toast({html: 'intro:  max 700'});
this.state=true; 
}
if (this.state == false){
  this.addpages(title,intro,cont,like1,like2,like3);
}
    })
}
}