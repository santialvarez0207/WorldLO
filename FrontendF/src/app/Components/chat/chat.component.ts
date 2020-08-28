import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from "../../Models/usuario"
import { UsuarioService } from "../../services/usuario.service"
import { getEnabledCategories } from 'trace_events';
import { SocketsService } from '../../services/sockets.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {
  b: Usuario;
  constructor(private usuarioService: UsuarioService, private socketService: SocketsService) { }
  ioConnection: any;


  ngOnInit(): void {


    this.inicio();
    let boton = document.getElementById("Ms")
    boton.style.visibility = "hidden"
    this.initIoConnection();

  }


  ngOnDestroy() {
    let boton = document.getElementById("Ms")
    boton.style.visibility = "visible"
  }

  private initIoConnection(): void {
    this.socketService.setupSocketConnection();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: String) => {
    if(message==localStorage.getItem("id")){
          console.log(message)
          this.actualizar();
        }
        
      });

  }


  inicio() {
    this.usuarioService.getusuario(localStorage.getItem("id")).subscribe(res => {
      this.b = res as Usuario;
      let eliminar = document.getElementById("chats")
      eliminar.remove()


      // this.b.Chat[0]={ultimo:"2",idFriend:"5f44479cf57dfc5c3804c3eb",NameFriend:"Santiago Alvarez",mensaje:["Hola","¿Como Estas?","Bien y tu?"],orden:["2","2","1"]}
      // this.usuarioService.putusuarios(this.b._id,this.b.name,this.b.password,this.b.mail,this.b.tipeuser,this.b.like1,this.b.like2,this.b.like3,this.b.config,this.b.Group,
      //   this.b.Like,this.b.Chat,this.b.solis).subscribe(res => {})
      let a = document.createElement("div");
      a.id = "chats"
      document.getElementById("chats1").appendChild(a)
      for (var i = 0; i <= this.b.Chat.length - 1; i++) {
        var x = this.b.Chat[i].mensaje.length - Number(this.b.Chat[i].ultimo)
        console.log(x)
        this.usuarios(this.b.Chat[i].NameFriend, x.toString(), this.b.Chat[i].mensaje, this.b.Chat[i].orden, this.b.Chat[i].idFriend)
      }
    });

  }

  usuarios(nombre: string, mensajes: string, mensaje: Array<string>, orden: Array<string>, id: string) {
    let a = document.createElement("a");
    a.className = "collection-item"
    a.innerHTML = nombre

    a.addEventListener('click', this.chat.bind(null, mensaje, orden, id));

    document.getElementById("chats").appendChild(a)
    if (mensajes != "0") {
      let span = document.createElement("span");
      span.className = "badge new"
      span.innerHTML = mensajes

      a.appendChild(span)

    }
  }

  chat(a: Array<string>, b: Array<string>, c: string) {
    let eliminar = <HTMLDivElement>document.getElementById("master")
    eliminar.remove()
    let master = document.createElement("div")
    master.id = "master"
    document.getElementById("mensajes").appendChild(master)
    master.className = c
    for (var ii = 0; ii <= a.length - 1; ii++) {
      let div = document.createElement("div");
      div.className = "card"
      div.style.borderRadius="20px"
      div.style.maxWidth = "60%"
      // div.style.opacity="80%"
      if (b[ii] == "1") {
        div.style.marginLeft = "38%"
        div.style.background = "linear-gradient(to right, #020690, #3539BF,#020690)";
        
        div.style.textAlign = "right"
        div.style.color = "white"
      } else {
        div.style.marginLeft = "2%"
        div.style.backgroundColor = "#ECECEC"
      }
      master.appendChild(div)
      for(var i=ii; i <= a.length - 1; i++){
        if (b[ii] == b[i]){
      let mensaje = document.createElement("h6")
      mensaje.style.marginLeft = "4%"
      mensaje.style.marginRight = "4%"
      mensaje.innerHTML = a[i]
      div.appendChild(mensaje)
      
        }else{break;}
      ii=i;
    }
    }
  }

  enviar() {

    var idamigo = document.getElementById("master").className
    console.log(idamigo)
    let envio = <HTMLInputElement>document.getElementById("envio")
    var mensaje = envio.value
    this.usuarioService.getusuario(localStorage.getItem("id")).subscribe(res => {
      this.b = res as Usuario;
      for (var i = 0; i <= this.b.Chat.length - 1; i++) {
        if (this.b.Chat[i].idFriend == idamigo) {
          this.b.Chat[i].orden[this.b.Chat[i].orden.length] = "1"
          this.b.Chat[i].mensaje[this.b.Chat[i].mensaje.length] = mensaje
          this.b.Chat[i].ultimo = this.b.Chat[i].mensaje.length.toString()
        }
      }
      this.usuarioService.putusuarios(this.b._id, this.b.name, this.b.password, this.b.mail, this.b.tipeuser, this.b.like1, this.b.like2, this.b.like3, this.b.config, this.b.Group,
        this.b.Like, this.b.Chat, this.b.solis).subscribe(res => { })
    })

    this.usuarioService.getusuario(idamigo).subscribe(res => {
      var b = res as Usuario;
      for (var i = 0; i <= b.Chat.length - 1; i++) {
        if (b.Chat[i].idFriend == localStorage.getItem("id")) {
          b.Chat[i].orden[b.Chat[i].orden.length] = "2"
          b.Chat[i].mensaje[b.Chat[i].mensaje.length] = mensaje
        }
      }
      this.usuarioService.putusuarios(b._id, b.name, b.password, b.mail, b.tipeuser, b.like1, b.like2, b.like3, b.config, b.Group, b.Like, b.Chat, b.solis).subscribe(res => { 
        this.socketService.send(idamigo)
         this.actualizar()})
    })
  }

  actualizar() {
    var idamigo = document.getElementById("master").className
    this.inicio()
    this.usuarioService.getusuario(localStorage.getItem("id")).subscribe(res => {
      this.b = res as Usuario;
      for (var i = 0; i <= this.b.Chat.length - 1; i++) {
        if (this.b.Chat[i].idFriend == idamigo) {
          this.chat(this.b.Chat[i].mensaje, this.b.Chat[i].orden, this.b.Chat[i].idFriend)
        }
      }



    })

  }


}
