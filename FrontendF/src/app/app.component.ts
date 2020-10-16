import { Component, ViewChild } from "@angular/core";
import { Paginascomponent } from "./Components/Paginas/Paginas.component";
import { stripSummaryForJitFileSuffix } from "@angular/compiler/src/aot/util";
import { Router } from "@angular/router";

declare var M: any; // esta es una variable que utiliza materialize

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "WorldLo";

  public state: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // al iniciar // 1
    this.modificate();
  }

  modificate() {
    var a;
    a = localStorage.getItem("id");
    if (a == "" || a == null) {
      let boton = document.getElementById("Ms");
      boton.style.visibility = "hidden";
      this.noLoga();
    } else {
      this.Loga();
      let boton = document.getElementById("Ms");
      boton.style.visibility = "visible";
    }
  }

  //si esta logeado
  Loga() {
    //------ se Crea en el nav el nombre el cual lo redirige a la pagina del usuario

    let UlNav = document.getElementById("nav-mobile");
    let liEtiqueta = document.createElement("li"); //crea un padre para que se pueda adaptar
    let aEtiqueta = document.createElement("a");

    //---------------------- creacion del logo -----------------------------
    let logo = document.createElement("i");
    logo.appendChild(document.createTextNode("account_circle"));
    logo.className = "material-icons left";
    aEtiqueta.appendChild(logo);

    //--------- se obtiene el nombre y se establece en la etiqueta a ------
    let nombre = document.createTextNode(localStorage.getItem("name"));
    aEtiqueta.appendChild(nombre);
    aEtiqueta.className = "btn-flat waves-effect waves-leght";
    aEtiqueta.style.color = "white";
    aEtiqueta.onclick = function tata() {
      // cuando se de click al elemento redireccionara al perfil del usuario
      window.location.replace("./Porfile");
    };
    //se establecen las etiquetas en el nav
    liEtiqueta.appendChild(aEtiqueta);
    UlNav.appendChild(liEtiqueta);

    // responsive
    //----- // lo mismo de arriba pero para el modo responsive

    let aResponsive = document.createElement("a");
    aResponsive.textContent = localStorage.getItem("name");
    aResponsive.onclick = function tata() {
      window.location.replace("./Porfile");
    };
    aResponsive.style.color = "white";
    let liResponsive = document.createElement("li");
    liResponsive.appendChild(aResponsive);
    document.getElementById("Encabezado2").appendChild(liResponsive);
  }

  // esto es para cuando el usuarion no esta logeado
  //para crear en el nav la direccion de login o register
  noLoga() {
    let UlNav = document.getElementById("nav-mobile");
    let liEtiqueta = document.createElement("li");
    let aEtiqueta = document.createElement("a");

    let contenido = document.createTextNode("login");
    aEtiqueta.appendChild(contenido);
    aEtiqueta.className = "btn-flat waves-effect waves-leght";
    aEtiqueta.style.color = "white";
    aEtiqueta.onclick = function tata() {
      window.location.replace("./aboutus");
    };

    liEtiqueta.appendChild(aEtiqueta);
    UlNav.appendChild(liEtiqueta);

    //----- // lo mismo de arriba pero para el modo responsive

    let aResponsive = document.createElement("a");
    aResponsive.textContent = "Login";
    aResponsive.onclick = function tata() {
      window.location.replace("./aboutus");
    };
    aResponsive.style.color = "white";
    let liResponsive = document.createElement("li");
    liResponsive.appendChild(aResponsive);
    document.getElementById("Encabezado2").appendChild(liResponsive);
  }

  ngAfterViewInit() {
    //2
    const elemDropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elemDropdown, {
      coverTrigger: false,
    });
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  }
}
