import { Component, OnInit } from '@angular/core';
import { ExamService } from "../../services/exam.service";
import { QuestionService } from "../../services/question.service";
import { UsuarioService } from "../../services/usuario.service";
import { Exam } from 'src/app/Models/exam';
import { Question } from 'src/app/Models/Question';
import { Usuario } from 'src/app/Models/usuario';
import { AppComponent}from'../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { text } from 'express';



@Component({
  selector: 'app-Paginas',
  templateUrl: './Examenes.component.html',
  styleUrls: ['./Examenes.component.css'],
  providers: [QuestionService,UsuarioService,ExamService]
  
})

export  class ExamcVisualiomponent implements OnInit{

constructor(public ExamService:ExamService,public usuarioService:UsuarioService,public questionService:QuestionService, private router:Router, private activatedRoute:ActivatedRoute) { }
id :string;
favoritestate: boolean=false;
new : boolean = true;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
  this.comprobar(this.id);      
    });
  }

  /*titulo -
  imagen -
  introduccion -
  Preguntas 
  Boton de envio
*/

  comprobar(a:string){ // verifica si el usuario es el creador del examen
    this.ExamService.getExam(a).subscribe(res=>{
      var b=res as Exam;
     console.log( res );
      this.Title(b.title);
          this.Imagen("http://localhost:3000/"+b.imgUrl);
          this.Intro(b.intro);
          this.pedirpregunta(0,b.questionid.length,b.questionid);
          if (localStorage.getItem("id")== b.usserid ){
            this.botton_delete();
            
          }else {
            let Texto = document.getElementById("sector1")
            Texto.remove();
          }
    });
  }

 pedirpregunta(y: number, z:number,x :Array<string>){ 
if (y<z){
  this.questionService.getQuestion(x[y]).subscribe(res=>{// toma las pregunta de la base de datos
    var c=res as Question;
    this.preguntas(c.text,c.resp,y+1);this.pedirpregunta(y+1,z,x)}
    )
}
 }



  Title (a:string){ // para dibujar el titulo
      let Texto = document.createElement('h3');
      var otracosa=a;
      Texto.style.marginLeft="2%";
      Texto.style.marginTop="70px";
      Texto.textContent =otracosa;
      document.getElementById("sector").appendChild(Texto);
    }

  Intro (a:string){ // para dibujar la introduccion
      let Texto = document.createElement('p');
      var otracosa=a;
      Texto.textContent =otracosa;
      Texto.style.marginLeft="2%";
      Texto.style.display="inline-block";
      Texto.style.width="30%";
      Texto.style.wordWrap="break-word";
      Texto.style.marginRight="20%";
      document.getElementById("sector").appendChild(Texto);
    }

  Imagen(a:string){// para dibujar la imagen del examen
    let Imagen = document.createElement('img');
    Imagen.style.marginLeft="2%";
    Imagen.style.background="#ff5733";
    Imagen.src=a;
    Imagen.style.width="30%";
    Imagen.style.left="10%";
    document.getElementById("sector").appendChild(Imagen);}

  botton_delete (){ // si es creador , el boton de donde porderlo eliminar
      let Texto = document.createElement('h5');
      Texto.textContent ="Do you want to delete this page?"
      Texto.style.marginLeft="2%";
      Texto.style.display="inline-block";
      Texto.style.width="78%";
      Texto.style.wordWrap="break-word";
      Texto.style.marginRight="20%";
      document.getElementById("sector1").appendChild(Texto);}

  delete(){//si se preciona el boton , eliminar el cuestionario
    this.ExamService.deleteExam(this.id).subscribe(res => {
    console.log(res)
    this.router.navigate(['/Home']);});}

  preguntas(a:string , b:Array<string>,i:number){ //dibujar las preguntas
    let n = document.createElement('div');
    n.id="BoxQuestion"+(1+i);
    n.style.left = "2%"
    n.className="card z-depth-3";
    n.style.color="#581845"
    n.style.width = "70%"
    document.getElementById("sector").appendChild(n);
    let Texto = document.createElement('h3');
    Texto.textContent ="Question "+i;
    Texto.style.marginLeft="2%";
    Texto.style.display="inline-block";
    Texto.style.width="78%";
    Texto.style.wordWrap="break-word";
    Texto.style.marginRight="20%";
    n.appendChild(Texto);
    Texto = document.createElement('h5');
    Texto.textContent =a;
    Texto.style.marginLeft="2%";
    Texto.style.display="inline-block";
    Texto.style.width="78%";
    Texto.style.wordWrap="break-word";
    Texto.style.marginRight="20%";
    n.appendChild(Texto);

    let label=document.createElement('label'); 
    let input=document.createElement('input');
    let span=document.createElement('span');
    for (var r=0;r<=3;r++){
      label=document.createElement('label'); 
      label.style.marginRight = "70%"

      label.style.color = "#581845"
      n.appendChild(label);
        input=document.createElement('input');
        input.className="with-gap purple darken-4 btn"
        input.name="Group"+i;
        input.type="radio"; 
        input.id="r-"+i+"-"+r;
        label.appendChild(input);
        span=document.createElement('span');
        span.style.marginLeft="2%"
        span.textContent=b[r];
        label.appendChild(span);
        console.log(r)
      }
    }

      Tomarvalores(){//para cuando se de enter se pida todos los valores
        let prueba;
        for (var r=0;r<=3;r++);{
          prueba=<HTMLLabelElement>document.getElementById("clase"+r)
          if (prueba.checked){
            
          }}
      }

    }
