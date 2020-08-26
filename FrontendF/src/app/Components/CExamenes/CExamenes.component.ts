import { Component, OnInit } from '@angular/core';
// import {lo que quiere} from  'de donde lo quiere'
import { ExamService } from "../../services/exam.service";
import { UsuarioService } from "../../services/usuario.service";
import { QuestionService } from "../../services/Question.service";
import { Question } from 'src/app/Models/Question';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';
import {Exam} from 'src/app/Models/Exam'
import { Imagenes } from 'src/app/Models/Imagenes';
import { ImagenesService } from "../../services/imagenes.service";
declare var M: any; // para utilizar materialize

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}



@Component({
  selector: 'app-Creacion',
  templateUrl: './CExamenes.component.html',
  styleUrls: ['./CExamenes.css'],
  providers: [ExamService,UsuarioService,QuestionService]
})
export class CExamenesComponent implements OnInit  {
  img: Array<string> = [];
  imag: number = 1;
  photoSelected: string | ArrayBuffer;
  file: File;
  usuario: Usuario[] = [];
  question: Question[]= [];
  contador:number=1; 
  count:number=0;
  ba:Array<string>=[];
  orden: Array<string> = [];
  ii: number = 0;
 state: boolean = true;
  constructor(public ExamService:ExamService, private router:Router,public usuarioService:UsuarioService,public questionService:QuestionService, public imagenservice: ImagenesService) { }

  ngOnInit(): void { //es lo primero que se ejectua
    this.Agregar(); // agrega la primera pregunta 
    var a =localStorage.getItem("name")
    this.usuarioService.getusuarios().subscribe(res=>{ // esta parte sirve para verificar si el usuario esta en la base de datos
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
    //----- hasta aca
    if (a == ""){
      M.toast({html: 'Srry you need stay register for create a new page :D'});
window.location.replace("./Usuarios")
    }
    
  }
  



  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }




envioExam(){ //luego de haber cargado todas las preguntas ser anexadas al examen se envia el examen a la base de datos
  var G: Array<string>=[];var a: string; var res:string;
  var b;
  var fd = new Exam;
  fd.questionid=[]
  for (var i=1 ; i <=this.count;i++){
  for (var ii=0 ; ii <=3;ii++){
    b=<HTMLTextAreaElement>document.getElementById("Res"+ii+"-"+(i));
    G[ii]=b.value;
    }
    b=<HTMLTextAreaElement>document.getElementById("Question-"+(i));
    a=b.value
    b=<HTMLOptionElement>document.getElementById("Res-"+(i));
    res=b.value

    console.log(G)
    console.log(a)
    console.log(res)

    fd.questionid[i-1]={preguntas:G,correcta:res,pregunta:a}
      
  }
  
   let x;
   console.log("1")
  var title:string;var intro:string
     x=<HTMLTextAreaElement>document.getElementById("title");
     title=x.value;
     x=<HTMLTextAreaElement>document.getElementById("intro");
     intro=x.value;
        console.log("2")
    //  this.ExamService.postExam().subscribe(res=>
    //  {console.log(res)});
     console.log (this.ba)

var imagenes:Array<File>=[]
     for (var i = 1; i <= this.imag - 1; i++) {
      let x = <HTMLInputElement>document.getElementById("imagen-" + i)
      imagenes[i-1] = x.files[0];
    }

     this.imagenservice.postImagenes(imagenes, this.imag - 1).subscribe(res => {
      let ids = res as Imagenes;
      console.log(ids)
      for (var i = 0; i <= this.imag - 2; i++) {
        this.img[i] = ids.U[i].path;
      }
      this.ExamService.postExam(title,intro,localStorage.getItem("id"),localStorage.getItem("name"),[],fd.questionid,this.img,this.orden).subscribe(res=>{console.log(res)
      let aqui= res as Exam
    
    document.getElementById("id").textContent="id: "+aqui._id
    });
        });


     
    }

33

Agregar(){ // esta funcion sirve para agregar preguntas al cuestionario
  let n = document.createElement('div' );
  n.id="BoxQuestion"+(1+this.count);
  n.style.left = "2%"
  n.className="card z-depth-3";
  n.style.color="#3c0074"
  n.style.width = "70%"
  document.getElementById("sector").appendChild(n);
  let t = document.createElement('h3');
  t.textContent="Question "+(1+this.count);
  t.style.left = "2%"
  t.style.color="#3c0074"
  t.style.width = "70%"
  n.appendChild(t);
   
  let a = document.createElement('textarea');
  a.style.width="80%"
  a.className="materialize-textarea";
  a.id="Question-"+(1+this.count);
  a.style.left = "2%"
  a.placeholder="Incert the question o point of the exam"
  a.style.color="#3c0074"
  a.style.marginLeft="2%"
  a.style.display="block"

  n.appendChild(a);

for (var ii=0 ; ii <=3;ii++){
  let b = document.createElement('p');
  b.textContent=""+(ii+1)
  b.className="materialize-textarea";
  b.style.color="#3c0074"
  b.style.display="inline-block"
  b.style.width = "5%"
  b.style.position = "-20px"
  b.style.marginLeft="2%"
  n.appendChild(b);

  a = document.createElement('textarea');
  a.className="materialize-textarea";
  
  a.id="Res"+ii+"-"+(1+this.count);
  a.style.width="80%"
  a.style.marginRight="10%"
  a.style.display="inline-block"
  a.style.color="#3c0074"
  n.appendChild(a);
}

let g = document.createElement('div' );
g.style.left = "2%"
g.style.color="#3c0074"
g.style.width = "70%"
n.appendChild(g);
var ya = document.createElement('select');
ya.style.width="70%"
ya.className="browser-default custom-select";
ya.id="Res-"+(1+this.count);
ya.style.left = "2%"
ya.style.color="#3c0074"

var option=document.createElement('option')
option.value="1";
option.text="1"
ya.appendChild(option);
var option=document.createElement('option')
option.value="2";
option.text="2"
ya.appendChild(option);
var option=document.createElement('option')
option.value="3";
option.text="3"
ya.appendChild(option);
var option=document.createElement('option')
option.value="4";
option.text="4"
ya.appendChild(option);

g.appendChild(ya);
this.count++;

this.ordenfuction(1,"1")
}

Eliminar (){ //esta sirve para eliminar preguntas del cuestionario
let y =document.getElementById("BoxQuestion"+(this.count));
y.remove()
this.count--;
this.ordenfuction(1,"2")
}



EliminarImagen() {// agrega para eliminar una pagina
  let y = document.getElementById("BoxImagen" + (this.imag));
  y.remove()
  this.imag--;
  this.ordenfuction(2, "2")
}

AgregarImagen() { // agrega para subir una imagen
  let n = document.createElement('div');
  n.id = "BoxImagen" + (1 + this.imag);
  n.className = "card z-depth-3";
  n.style.color = "#3c0074"
  n.style.width = "70%"
  n.style.marginLeft = "2%"
  document.getElementById("sector").appendChild(n);
  let t = document.createElement('h3');
  t.textContent = "Imagen " + (this.imag);
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