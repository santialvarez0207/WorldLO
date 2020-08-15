import { Component, ViewChild } from '@angular/core';
import { Paginascomponent } from './Components/Paginas/Paginas.component'
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { Router } from '@angular/router';

declare var M: any; // esta es una variable que utiliza materialize

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WorldLo';

  public state: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void { // al iniciar // 1
    this.modificate();
  }
  modificate() {
    var a: string;
    a = localStorage.getItem("id");
    if (a == '') {
      this.noLoga();
    } else {
      this.Loga();
    }
  };

  Loga() { //si esta logeado
    //------ Crea en el nav el nombre el cual lo redirige a la pagina del usuario
    let Texto = document.createElement('a');// crea un elemento <a>
    Texto.textContent = localStorage.getItem("name"); // toma del local storage el nombre del usuario
    Texto.style.margin = ' 0px 30px'; //damos margen al elemento
    Texto.onclick = function tata() { // cuando se de click al elemento redireccionara al perfil del usuario
      window.location.replace('./Porfile');
    }
    document.getElementById("Encabezado").appendChild(Texto); //el elemento es hijo de objeto con id "encabezado"
    //---- Crea en el nav "loggout" el cual permite al usuario salir 
    Texto = document.createElement('a');
    Texto.textContent = "Logout";
    Texto.style.margin = ' 0px 30px';
    Texto.onclick = function tata() { //cuando se haga click , establecera todos los datos en "" y sera como si estuvieran vacios o no logeado
      localStorage.setItem("id", '');
      localStorage.setItem("name", '');
      localStorage.setItem("Correo", '');
      window.location.replace('./Usuarios');
    }
    document.getElementById("Encabezado").appendChild(Texto);
    //--------- // lo mismo de arriba pero para el modo responsive
    let responsive = document.createElement('li');
    document.getElementById("Encabezado2").appendChild(responsive);
//nombre
    Texto = document.createElement('a');
    Texto.textContent = localStorage.getItem("name");
    Texto.style.color = '#ffc305';
    Texto.onclick = function tata() {
      window.location.replace('./Porfile');
    }
    //logout
    responsive.appendChild(Texto);
    Texto = document.createElement('a');
    Texto.textContent =  "Logout";
    Texto.style.color = '#ffc305';
    responsive.appendChild(Texto);


  }
  noLoga() { // esto es para cuando el usuarion no esta logeado
    //para crear en el nav la direccion de login o register 
    let Texto = document.createElement('a'); 
    Texto.textContent = 'Login';
    Texto.style.margin = ' 0px 30px';
    Texto.onclick = function tata() {
      window.location.replace('./Usuarios');
    }
    document.getElementById("Encabezado").appendChild(Texto);
    //----- // lo mismo de arriba pero para el modo responsive
    let responsive = document.createElement('li');
    document.getElementById("Encabezado2").appendChild(responsive);
    Texto = document.createElement('a');
    Texto.textContent = 'Login';
    Texto.style.margin = ' 0px 30px';
    Texto.onclick = function tata() {
      window.location.replace('./Usuarios');
    }
    Texto.style.color = '#ffc305';
    responsive.appendChild(Texto);
  }

  ngAfterViewInit() { //2
    const elemDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemDropdown, {
      coverTrigger: false
    });
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  }


}
