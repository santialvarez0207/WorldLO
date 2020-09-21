import { Component, OnInit } from '@angular/core';
import { PageService } from "../../services/Page.service";
import { UsuarioService } from "../../services/usuario.service";
import { Page } from 'src/app/Models/page';
import { Usuario } from 'src/app/Models/usuario';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { text } from 'express';
import { Http2Server } from 'http2';
import { HtmlParser } from '@angular/compiler';

declare var M: any;


@Component({
  selector: 'app-Paginas',
  templateUrl: './Paginas.component.html',
  styleUrls: ['./Paginas.component.css'],
  providers: [PageService, UsuarioService]

})

export class Paginascomponent implements OnInit {

  constructor(private usuarioservice: UsuarioService, private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) { }
  id: string;
  favoritestate: boolean = false;
  new: boolean = true;
  creador=false;
  b:Page;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.comprobar(this.id);
    });


    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.materialboxed');
      var instances = M.Materialbox.init(elems);
    });
  }

  comprobar(a: string) {
    this.pageService.getPagina(a).subscribe(res => {
      var b = res as Page;
      this.b=b
      console.log(res);
      this.Title(b.title);
      this.Imagen("http://localhost:3000/" + b.imgUrl);
      this.Intro(b.intro);
      this.Contenido(b.cont);
      this.addcoment(b.com, b.Creador,0,b.idCreador);
      this.contenidos(b.Texto,b.imgUrlB,b.videos,b.orden)
      var h;

      if (localStorage.getItem("id") == b.usserid) {
        this.botton_delete()
        this.creador=true;

      } else {
        let Texto = document.getElementById("sector1")
        Texto.remove();
      }
      this.follower()
    });
  





  }


  Title(a: string) {
    let Texto = document.createElement('h3');
    Texto.style.marginLeft = "2%";
    Texto.textContent = a;
    document.getElementById("title").appendChild(Texto);
    let x =document.getElementById("like")
    if(this.b.like != null){
      x.innerHTML=this.b.like.toString()
    }else{
      x.innerHTML="0"}
    
  }

  Intro(a: string) {
    let Texto = document.createElement('p');
    Texto.textContent = a;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "60%";
    Texto.style.wordWrap = "break-word";
    Texto.style.textAlign= "left";
    Texto.style.verticalAlign= "top";
    document.getElementById("title").appendChild(Texto);
  }

  Contenido(a: string) {
    let Texto = document.createElement('p');
    var otracosa = a
    Texto.textContent = otracosa;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "90%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector").appendChild(Texto);
  }

  Imagen(a: string) {
    let Imagen = document.createElement('img');
    Imagen.style.marginLeft = "2%";
    Imagen.style.background = "#ff5733";
    Imagen.src = a;
    Imagen.style.width = "30%";
    Imagen.style.left = "10%";
    document.getElementById("title").appendChild(Imagen);
  }

  botton_delete() {
    let Texto = document.createElement('h5');
    Texto.textContent = "Do you want to delete this page?"
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "80%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector1").appendChild(Texto);

  }
  delete() {
    this.pageService.deletePagina(this.id).subscribe(res => {
      console.log(res)
      this.router.navigate(['/Home']);
    });
  }

  contenidos(a:Array<string>,b:Array<string>,c:Array<string>,d:Array<string>){
    var conta:number=0,contb:number=0,contc:number=0;

    for(var i = 0; i <= d.length-1; i++){

      if(d[i]=='1'){
        console.log(a[conta] );
        this.addcontenido(a[conta])
        conta++;

      }else if (d[i]=='2') {
        console.log(b[contb] );
        this.addimagenes("http://localhost:3000/" +b[contb])
        contb++;

      } else if (d[i]=='3'){
        console.log(c[contc] );
        this.addvideo(c[contc])
        contc++;

      }else{}

    }


  }

addimagenes(a:string){
  let div =  document.createElement('div');
  div.className="card z-depth-3"
  div.style.width="80%"
  div.style.marginLeft="10%"
  document.getElementById("contenido").appendChild(div)
  let Imagen = document.createElement('img');
  Imagen.src = a;
  Imagen.style.marginLeft="10%"
  Imagen.style.width="80%"
  div.appendChild(Imagen);
}

addcontenido(a:string){
  let div =  document.createElement('div');
  div.className="card z-depth-3"
  div.style.width="80%"
  div.style.marginLeft="10%"
  document.getElementById("contenido").appendChild(div)
  let Texto = document.createElement('p');
  var otracosa = a
  Texto.textContent = otracosa;
  Texto.style.marginLeft = "2%";
  Texto.style.display = "inline-block";
  Texto.style.width = "78%";
  Texto.style.wordWrap = "break-word";
  Texto.style.marginRight = "20%";
  div.appendChild(Texto);
}

addvideo(a:string){  
let div =  document.createElement('div');
div.className="card z-depth-3"
div.style.width="80%"
div.style.marginLeft="10%"
document.getElementById("contenido").appendChild(div)
let video = document.createElement('div');
video.className="video-container"
div.appendChild(video);


let link = document.createElement('iframe');
link.src=a
video.appendChild(link)
}





  addcoment(a: Array<string>, b: Array<string>, c:number,id:Array<string>) {
    if (c==0){
    if (a.length == null) { } else {
      if (a.length - 1 >= 0) {
        for (var i = a.length-1; i >= 0 ; i--) {
          let n = document.createElement('div');
          n.style.left = "2%"
          n.className="card z-depth-3";
          n.style.width = "80%"
          document.getElementById("Comentarios").appendChild(n);
          let Texto = document.createElement('p');
          Texto.textContent = a[i];
          Texto.style.marginLeft = "2%";
          Texto.style.display = "inline-block";
          Texto.style.width = "78%";
          Texto.style.wordWrap = "break-word";
          Texto.style.marginRight = "20%";
          n.appendChild(Texto);
          Texto = document.createElement('p');
          Texto.textContent = "by: " + b[i];
          Texto.style.marginLeft = "2%";
          Texto.style.display = "inline-block";
          Texto.style.color = "#3c0074"
          Texto.style.width = "80%";
          Texto.style.wordWrap = "break-word";
          Texto.style.marginRight = "20%";
          n.appendChild(Texto);
          console.log(id[i])
          if (id[i]==localStorage.getItem("id") || this.creador==true ){
            let icono= document.createElement('i');
            icono.textContent = "delete";
            icono.style.display = "inline-block";
            icono.className="Small material-icons"
            n.appendChild(icono);
          }
        }
      }
    }
  } else{
    let n = document.createElement('div');
    n.style.left = "2%"
    n.className="card z-depth-3";
    n.style.width = "80%"
    document.getElementById("ComentariosN").appendChild(n);
    let Texto = document.createElement('p');
    Texto.textContent = a[a.length - 1 ];
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);
    Texto = document.createElement('p');
    Texto.textContent = "by: " + b[a.length - 1 ];
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.color = "#3c0074"
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);
    let icono= document.createElement('i');
    icono.textContent = "delete";
    icono.style.display = "inline-block";
    icono.className="Small material-icons"
    n.appendChild(icono);
  }
  }

  newcoment(a: HTMLInputElement) {
    var idCreador: Array<string>,
      Creador: Array<string>,
      com: Array<string>,
      y: number;
    console.log(this.id);
    var dataid: string;
    this.activatedRoute.params.subscribe(params => {
      dataid = params['id'];
    });
    this.pageService.getPagina(dataid).subscribe(res => {
      var b = res as Page;
      console.log(res);
      y = b.Creador.length;
      if (y == null) {
        y = 0;
      }
      idCreador = b.idCreador;
      Creador = b.Creador;;
      com = b.com;
      idCreador[y] = localStorage.getItem("id");
      Creador[y] = localStorage.getItem("name");
      com[y] = a.value;
      y = b.Creador.length;

      this.pageService.putPagina(b._id, b.title, b.intro, b.usserid, b.ussename, b.like1, b.like2, b.like3, b.cont, b.Texto, com, idCreador, Creador, b.like,b.videos,b.orden,b.imgUrlB,b.likeid).subscribe(res => {
      this.addcoment( com,Creador,1,idCreador)
      });
    });



  }

  follower() {
    this.favoritestate = false;
      var a = this.b.likeid.length



    console.log(this.b.likeid.length)
    for (var i = 0; i <= a - 1; i++) {
      console.log("f")
      if (this.b.likeid[i] == localStorage.getItem("id")) {
        console.log("hola")
        this.favoritestate = true;
      }
    }
    if (this.favoritestate == true) {
          let ico = document.getElementById("fav");
          ico.style.color = "#3c0074";
    } else {
      let ico = document.getElementById("fav");
      ico.style.color = "black";
    }
  }

  seguir() {

    this.pageService.getPagina(this.id).subscribe(res => {
      
      this.b = res as Page;
      var like=this.b.like;
      if (this.favoritestate == true) {
        var a = this.b.likeid.length
        console.log(a)
        for (var i = 0; i <= a - 2; i++) {
          if (this.b.likeid[i] == localStorage.getItem("id")) {
           
           
            for (var ii = i; ii <= this.b.likeid.length - 2; ii++) {
              this.b.likeid[ii] = this.b.likeid[ii + 1]
            }
          }
        }
        like=like-1;
        this.b.likeid.length = this.b.likeid.length - 1
        if(like<0){
          like=0;
        }
      }
      if (this.favoritestate == false) {
        like++;
        
        this.b.likeid[this.b.likeid.length] = localStorage.getItem("id")
      }
      this.pageService.putPagina(this.b._id, this.b.title, this.b.intro, this.b.usserid, this.b.ussename, 
        this.b.like1, this.b.like2, this.b.like3, this.b.cont, this.b.Texto, this.b.com, this.b.idCreador, this.b.Creador, like,
        this.b.videos,this.b.orden,this.b.imgUrlB,this.b.likeid).subscribe(res => {
        this.seguirUsuario()
      })
    })
  }


  
  seguirUsuario() {
    this.usuarioservice.getusuario(localStorage.getItem("id")).subscribe(res => {
      let b = res as Usuario;
      console.log(b)
      if (this.favoritestate == true) {
        var a = b.Like.length
        for (var i = 0; i <= a - 2; i++) {
          if (b.Like[i].id ==this.id) {
            for (var ii = i; ii <= b.Like.length - 2; ii++) {
              b.Like[ii] = b.Like[ii + 1]
            }
          }
        }
        b.Like.length =b.Like.length - 1
      }
      if (this.favoritestate == false) {
        
        b.Like[b.Like.length] = { name:this.b.title,id:this.id}
      }
      this.usuarioservice.putusuarios(b._id,b.name,b.password,b.mail,b.tipeuser,b.like1,b.like2,b.like3,b.config,b.Group,b.Like,b.Chat,b.solis).subscribe(res => {this.follower();
      console.log(res)})
    })
  }



}








