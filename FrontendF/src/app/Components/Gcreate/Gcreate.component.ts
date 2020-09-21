import { Component, OnInit, Output,EventEmitter,ɵCurrencyIndex } from '@angular/core';
import { GroupService } from "../../services/Group.service";
import { UsuarioService } from "../../services/usuario.service";
import { FormsModule  } from '@angular/forms';
import { Group } from 'src/app/Models/Group';
import { AppComponent}from'../../app.component';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';


declare var M: any;

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-Gcreate',
  templateUrl: './Gcreate.component.html',//cual elemento html esta utilizando
  styleUrls: ['./Gcreate.component.css'],//cual elemento css esta utilizando
  providers: [GroupService,UsuarioService,FormsModule],
})



export class Gcreatecomponent implements OnInit  {
  photoSelected: string | ArrayBuffer;
  file: File;
  usuario: Usuario[] = [];

 state: boolean = true;
  constructor(public groupService:GroupService, private router:Router,public usuarioService:UsuarioService) { }

  ngOnInit(): void { // verifica que el usuario exista


    var a =localStorage.getItem("name")
    this.usuarioService.getusuarios().subscribe(res=>{
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

  onPhotoSelected(event: HtmlInputEvent): void { // subir una foto 
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  addpages(title:string,intro:string){ // enviar los datos a la base de datos
    if (this.state == false){
  this.groupService.postGroup(title,intro, localStorage.getItem("id"),localStorage.getItem("name"),this.file).subscribe(res =>{ 
console.log(res)
 });
 M.toast({html:'Group create :b'});
    
  
    }
  }


verificacion(){ // verificar si cumple los parametros
var title:string,intro:string;
  let GG=<HTMLTextAreaElement>document.getElementById("title")
 title=GG.value
   GG=<HTMLTextAreaElement>document.getElementById("intro")
 intro=GG.value
this.state = false;
if (intro.length > 700  ){
M.toast({html: 'intro:  max 700'});
this.state=true; 
}
if (this.state == false){
  
  this.addpages(title,intro);
}

}
}