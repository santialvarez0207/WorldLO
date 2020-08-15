import { Component, OnInit } from '@angular/core';
// import {lo que quiere} from  'de donde lo quiere'
import { ExamService } from "../../services/exam.service";
import { UsuarioService } from "../../services/usuario.service";
import { QuestionService } from "../../services/Question.service";
import { Question } from 'src/app/Models/Question';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/usuario';

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

  photoSelected: string | ArrayBuffer;
  file: File;
  usuario: Usuario[] = [];
  question: Question[]= [];
  contador:number=1; 
  count:number=0;
  ba:Array<string>=[];

 state: boolean = true;
  constructor(public ExamService:ExamService, private router:Router,public usuarioService:UsuarioService,public questionService:QuestionService) { }

  ngOnInit(): void { //es lo primero que se ejectua

    this.Agregar(); // agrega la primera pregunta
    var xd;
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

borrarhastaelalma(){ //borra todas las preguntas en la base de datos
  this.questionService.getQuestions().subscribe(res=>{
    let a= res as Question[];
    for (var i= 0 ; i <=a.length-1;i++ ){
      this.questionService.deleteQuestion(a[i]._id).subscribe(res=>{});
    }
  });

}

Envio (actual:number){ //esta funcion sirve para cargar las preguntas la base de datos y toma el id de cada una para despues se le asigne a al cuestionario en general
  //let x=<HTMLTextAreaElement>document.getElementById("hola");
  var G: Array<string>= ["","","",""];var y: string; var res:string;
  
  y;
  let x;
  if (actual<this.count){

//toma el valor de las 4 opciones
  for (var ii=0 ; ii <=3;ii++){
  x=<HTMLTextAreaElement>document.getElementById("Res"+ii+"-"+(actual+1));
  G[ii]=x.value;
  }
  x=<HTMLTextAreaElement>document.getElementById("Question-"+(1+actual));
  y=x.value
  x=<HTMLTextAreaElement>document.getElementById("Res-"+(1+actual));
  res=x.value
//---------------------

this.questionService.postQuestion(y,G,y,localStorage.getItem("id")).subscribe(res=>{ //pregunta
    this.questionService.getQuestions().subscribe(res=>{
      let a= res as Question[];
      for (var i= 0 ; i <=a.length-1;i++ ){
        if (a[i].Uid==localStorage.getItem("id")){ // comparamos si la nueva pregunta, id = = al usuario
          this.ba[actual]=a[i]._id; // tomamos la id del la pregunta
          console.log(a[i])
          this.questionService.putQuestion(a[i].text,a[i].resp,y,a[i]._id,"").subscribe(res=>{console.log(res);
            this.Envio(actual+1)});}
      }
    })//get questions :c

  });

  }if (actual>=this.count){
   this.envioExam();
  }


}
envioExam(){ //luego de haber cargado todas las preguntas ser anexadas al examen se envia el examen a la base de datos
   let x;
   console.log("1")
  var title:string;var intro:string
     x=<HTMLTextAreaElement>document.getElementById("title");
     title=x.value;
     x=<HTMLTextAreaElement>document.getElementById("intro");
     intro=x.value;
        console.log("2")
     this.ExamService.postExam(title,intro,localStorage.getItem("id"),localStorage.getItem("name"),this.file,this.ba,this.ba.length).subscribe(res=>
     {console.log(res)});
     console.log (this.ba)
    
    }



Agregar(){ // esta funcion sirve para agregar preguntas al cuestionario
  let n = document.createElement('div' );
  n.id="BoxQuestion"+(1+this.count);
  n.style.left = "2%"
  n.className="card z-depth-3";
  n.style.color="#581845"
  n.style.width = "70%"
  document.getElementById("sector").appendChild(n);
  let t = document.createElement('h3');
  t.textContent="Question "+(1+this.count);
  t.style.left = "2%"
  t.style.color="#581845"
  t.style.width = "70%"
  n.appendChild(t);
   
  let a = document.createElement('textarea');
  a.style.width="70%"
  a.className="materialize-textarea";
  a.id="Question-"+(1+this.count);
  a.style.left = "2%"
  a.placeholder="Incert the question o point of the exam"
  a.style.color="#581845"

  n.appendChild(a);
 let p = document.createElement('input');
 p.style.display="block";
 p.style.background= "#581845"
 p.type="file";
 p.className="btn waves-effect"

 n.appendChild(p);

  let i= document.createElement('img');

  p.appendChild(i);

for (var ii=0 ; ii <=3;ii++){
  let b = document.createElement('p');
  b.textContent=""+(ii+1)
  b.className="materialize-textarea";
  b.style.color="#581845"
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
  a.style.color="#581845"
  n.appendChild(a);
}
a = document.createElement('textarea');
  a.style.width="70%"
  a.className="materialize-textarea";
  a.id="Res-"+(1+this.count);
  a.style.left = "2%"
  a.placeholder="Incert correct answer"
  a.style.color="#581845"
  n.appendChild(a);
this.count++;
}

Eliminar (){ //esta sirve para eliminar preguntas del cuestionario
let y =document.getElementById("BoxQuestion"+(this.count));
y.remove()
this.count--;
}
}