import { Component, OnInit } from '@angular/core';
import { ExamService } from "../../services/exam.service";
import { QuestionService } from "../../services/question.service";
import { UsuarioService } from "../../services/usuario.service";
import { Exam } from 'src/app/Models/exam';
import { Question } from 'src/app/Models/Question';
import { Usuario } from 'src/app/Models/usuario';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { text } from 'express';


declare var M: any;
@Component({
  selector: 'app-Paginas',
  templateUrl: './Examenes.component.html',
  styleUrls: ['./Examenes.component.css'],
  providers: [QuestionService, UsuarioService, ExamService]

})

export class ExamcVisualiomponent implements OnInit {

  constructor(public ExamService: ExamService, public usuarioService: UsuarioService, public questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) { }
  id: string;
  favoritestate: boolean = false;
  new: boolean = true;
  conta: number = 0;
  b:Exam;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.comprobar(this.id);
    });
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });
  }

  /*titulo -
  imagen -
  introduccion -
  Preguntas 
  Boton de envio
*/

  comprobar(a: string) { // verifica si el usuario es el creador del examen
    this.ExamService.getExam(a).subscribe(res => {
      this.b = res as Exam;
      console.log(res);
      this.Title(this.b.title);
      this.Intro(this.b.intro);

      this.contenidos(this.b.questionid, this.b.imagen, this.b.orden)
      if (localStorage.getItem("id") == this.b.usserid) {
        this.tabla();
      } else {
        let Texto = document.getElementById("sector1")
        Texto.remove();
        Texto = document.getElementById("sector11")
        Texto.remove();
        Texto = document.getElementById("sector111")
        Texto.remove();
      }
    });
   
  }


  Title(a: string) { // para dibujar el titulo
    let Texto = document.createElement('h3');
    var otracosa = a;
    Texto.style.marginLeft = "10%";
    Texto.textContent = otracosa;
    document.getElementById("sector").appendChild(Texto);
  }

  Intro(a: string) { // para dibujar la introduccion
    let Texto = document.createElement('p');
    var otracosa = a;
    Texto.textContent = otracosa;
    Texto.style.marginLeft = "10%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector").appendChild(Texto);
  }




  delete() {//si se preciona el boton , eliminar el cuestionario
    this.ExamService.deleteExam(this.id).subscribe(res => {
      console.log(res)
      this.router.navigate(['/Home']);
    });
  }

  preguntas(a: string, b: Array<string>, i: number) { //dibujar las preguntas
    let n = document.createElement('div');
    n.id = "BoxQuestion" + (1 + i);
    n.style.left = "10%"
    n.className = "card z-depth-3";
    n.style.color = "#3c0074"
    n.style.width = "80%"
    document.getElementById("sector").appendChild(n);
    let Texto = document.createElement('h3');
    Texto.textContent = "Question " + (i+1);
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);
    Texto = document.createElement('h5');
    Texto.textContent = a;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);

    let label = document.createElement('label');
    let input = document.createElement('input');
    let span = document.createElement('span');

    label = document.createElement('label');
    label.style.marginRight = "70%"
    label.style.color = "#3c0074"
    n.appendChild(label);

    var ya = document.createElement('select');
    ya.style.width = "70%"
    ya.className = "browser-default custom-select";
    ya.id = "r-" + i;
    ya.style.left = "2%"
    ya.style.color = "#3c0074"
    label.appendChild(ya);

    for (var r = 0; r <= 3; r++) {
      var option=document.createElement('option')
      option.value=(r+1).toString(8);
      option.text=b[r]
      option.style.width="200%"
      ya.appendChild(option);
    }
  }

  Tomarvalores() {//para cuando se de enter se pida todos los valores
    let prueba;
    var x:Array<string>=[],acum:number=0,punt:number=0;
    for (var i = 0; i <= this.conta - 1; i++) {
    prueba = <HTMLOptionElement>document.getElementById("r-" + i)
    x[i]=prueba.value
    console.log(x[i])
    if(this.b.questionid[i].correcta==x[i]){
acum++;
    }
    
    }
    punt=(acum/this.conta)*100
    console.log(punt)

    this.b.respondidas[this.b.respondidas.length]={respuestas:x,nombre:localStorage.getItem("name"),puntuacion:punt}
    this.ExamService.putExam(this.b._id,this.b.title,this.b.intro,this.b.usserid,this.b.ussename,this.b.configuracion,
      this.b.questionid,this.b.imagen,this.b.orden,this.b.respondidas).subscribe(res => {
        console.log(res)})
  }

  contenidos(questionid: Array<{
    preguntas: Array<string>,
    correcta: string
    pregunta: string;
  }>, b: Array<string>, d: Array<string>) {
    var contb: number = 0;

    for (var i = 0; i <= d.length - 1; i++) {

      if (d[i] == '1') {

        this.preguntas(questionid[this.conta].pregunta, questionid[this.conta].preguntas, this.conta)
        this.conta++;
      } else if (d[i] == '2') {
        console.log(b[contb]);
        this.addimagenes("http://localhost:3000/" + b[contb])
        contb++;

      }

    }
  }
  addimagenes(a: string) {
    let div = document.createElement('div');
    div.className = "card z-depth-3"
    div.style.width = "80%"
    div.style.marginLeft = "10%"
    document.getElementById("sector").appendChild(div)
    let Imagen = document.createElement('img');
    Imagen.src = a;
    Imagen.style.marginLeft = "10%"
    Imagen.style.width = "80%"
    div.appendChild(Imagen);
  }

  tabla(){

    for(var i=0;i<=this.b.respondidas.length-1;i++){
let tr = document.createElement("tr")
document.getElementById("tabla").appendChild(tr)
let td = document.createElement("td")
td.innerHTML=this.b.respondidas[i].nombre
tr.appendChild(td)
td = document.createElement("td")
td.innerHTML=this.b.respondidas[i].puntuacion.toString()
tr.appendChild(td)

for(var r=0;r<=this.conta-1;r++){
  td = document.createElement("td")
  td.innerHTML=this.b.respondidas[i].respuestas[r]
  tr.appendChild(td)
}
    }

    for(var i=0;i<=this.conta-1;i++){
      let td = document.createElement("th")
      td.innerHTML="Question "+(i+1)
      document.getElementById("tablaE").appendChild(td)
    }


  }

}
