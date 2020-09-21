import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/Models/usuario';
import { AppComponent}from'../../app.component';
import { Router } from '@angular/router';



declare var M: any;

@Component({
  selector: 'app-Porfile',
  templateUrl: './Porfile.component.html',
  styleUrls: ['./Porfile.component.css'],
  providers: [UsuarioService]
})
export class PorfileComponent  {
  public state: boolean= false;
  constructor(public UsuarioService:UsuarioService, private router:Router) { }
  correo:string;
  b:Usuario;

 ngOnInit(): void {
  this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(res=>{
this.b=res;
    })
this.Formato();
 }

  adduser(name: HTMLInputElement,password: HTMLInputElement,mail: HTMLInputElement){
this.UsuarioService.putusuarios(localStorage.getItem("id"),name.value,password.value,mail.value,this.b.tipeuser,this.b.like1,this.b.like2,this.b.like3,this.b.config,this.b.Group,this.b.Like,this.b.Chat,this.b.solis).subscribe(res=>{  
  localStorage.setItem("name",name.value);
  localStorage.setItem("Correo",mail.value);
  M.toast({html:'update Successfuly'});}
  )};
  
  Formato(){ 
    let Texto = document.createElement('h5');
    var otracosa=localStorage.getItem("name");
    Texto.textContent =otracosa;
    document.getElementById("lugar").appendChild(Texto);
    
    Texto = document.createElement('h5');
    otracosa=localStorage.getItem("Correo");
    this.correo=localStorage.getItem("Correo");
    Texto.textContent =otracosa;
    document.getElementById("lugar1").appendChild(Texto);}

    verificacion(name: HTMLInputElement,password: HTMLInputElement,mail: HTMLInputElement){

      this.UsuarioService.getusuarios().subscribe(res=>{
        this.state = false;
        this.UsuarioService.usuario = res as Usuario[];
        var h;
        h = this.UsuarioService.usuario.length;
        for(var i=0;i<=h-1;i++){
          if (mail.value ==res[i].mail && mail.value != this.correo){
            if (name.value ==res[i].name && name.value != this.correo){
              M.toast({html: 'User name in used'});
              this.state=true; 
            } 
            else{
              M.toast({html: 'email in used'});
              this.state=true; 
            }
          } 
        }
   if (name.value.length > 20 || name.value.length < 12 ){
    M.toast({html: 'name:  max 20 and min 12'});
    this.state=true; 
   }
  
  if (mail.value.indexOf('@')<0  || mail.value.indexOf('.com')<0 ){
    M.toast({html: 'Email not validate'});
    this.state=true; 
  }
  if (this.state == false){
    this.adduser(name,password,mail);
  }
  return this.state;
        })
    }

}

