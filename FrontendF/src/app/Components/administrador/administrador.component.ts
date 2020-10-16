import { Component, OnInit } from "@angular/core";
import { Soli } from "src/app/Models/Solis";
import { SolisService } from "../../services/solis.service";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "src/app/Models/usuario";

declare var M: any;
@Component({
  selector: "app-administrador",
  templateUrl: "./administrador.component.html",
  styleUrls: ["./administrador.component.css"],
})
export class AdministradorComponent implements OnInit {
  constructor(
    private SolisService: SolisService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
    });

    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems);
    });
    let parte1 = document.getElementById("etapa1");
    parte1.style.visibility = "hidden";
    this.verificar();
  }
  inicio() {
    this.SolisService.getsolis().subscribe((res) => {
      var datos = res as Soli[];
      console.log(datos);

      //crea la tabla de las personas que lo han enviado
      for (var i = 0; i <= datos.length - 1; i++) {
        let tr = document.createElement("tr");
        document.getElementById("tablas").appendChild(tr);
        let td = document.createElement("td");
        td.innerHTML = datos[i].dato[0];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = datos[i].dato[1];
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = datos[i].fechas;
        tr.appendChild(td);
        let icon = document.createElement("i");
        icon.textContent = "pageview";
        icon.className = "material-icons";
        icon.addEventListener(
          "click",
          this.escribir.bind(
            null,
            datos[i].dato,
            datos[i]._id,
            datos[i].imagenes,
            datos[i].uid
          )
        );
        tr.appendChild(icon);
      }
    });
  }

  escribir(datos: Array<string>, id: string, ima: Array<string>, usu: string) {
    let x = <HTMLTitleElement>document.getElementById("name");
    x.innerHTML = datos[0];
    x = <HTMLTitleElement>document.getElementById("sur");
    x.innerHTML = datos[1];
    x = <HTMLTitleElement>document.getElementById("mail");
    x.innerHTML = datos[2];
    x = <HTMLTitleElement>document.getElementById("stu");
    x.innerHTML = datos[3];
    x = <HTMLTitleElement>document.getElementById("url");
    x.innerHTML = datos[4];
    x = <HTMLTitleElement>document.getElementById("job");
    x.innerHTML = datos[5];
    x = <HTMLTitleElement>document.getElementById("dir");
    x.innerHTML = datos[6];
    x = <HTMLTitleElement>document.getElementById("pho");
    x.innerHTML = datos[7];
    x = <HTMLTitleElement>document.getElementById("cou");
    x.innerHTML = datos[9];
    let y = <HTMLDivElement>document.getElementById("value");
    y.className = id;
    y = <HTMLDivElement>document.getElementById("valueu");
    y.className = usu;

    let img = <HTMLImageElement>document.getElementById("i1");
    img.src = "http://localhost:3000/" + ima[0];
    img = <HTMLImageElement>document.getElementById("i2");
    img.src = "http://localhost:3000/" + ima[1];
    img = <HTMLImageElement>document.getElementById("i3");
    img.src = "http://localhost:3000/" + ima[2];
  }

  verificar() {
    // para cuando incia
    var a = localStorage.getItem("name");
    this.usuarioService.getusuarios().subscribe((res) => {
      // hace una verificacion si el usuario esta en la base de datos
      this.usuarioService.usuario = res as Usuario[];
      var h;
      var x: boolean = false;
      h = this.usuarioService.usuario.length;
      for (var i = 0; i <= h - 1; i++) {
        var s = localStorage.getItem("id");
        if (s == res[i]._id) {
          x = true;
          if (res[i].tipeuser != "2") {
            M.toast({
              html: "Srry you need be a admin srry  ",
            });
            window.location.replace("./Home");
          }
        }
      }
      if (x == false) {
        M.toast({ html: "In not database " });
        window.location.replace("./Home");
        localStorage.setItem("name", "");
        localStorage.setItem("id", "");
        localStorage.setItem("Correo", "");
      }
    });

    if (a == "" || a == null) {
      M.toast({ html: "Srry you need stay register for create a new page :D" });
      window.location.replace("./Usuarios");
    }

    let boton = document.getElementById("Ms");
    boton.style.visibility = "hidden";
  }

  ngOnDestroy() {
    let boton = document.getElementById("Ms");
    boton.style.visibility = "visible";
  }

  ingresar() {
    let x = <HTMLInputElement>document.getElementById("Key");
    this.SolisService.clave(x.value).subscribe((res) => {
      console.log(res);
      var x = res;
      if (x == "true") {
        let parte1 = document.getElementById("etapa2");
        parte1.remove();
        parte1 = document.getElementById("etapa1");
        parte1.style.visibility = "visible";
        this.inicio();
      }
    });
  }

  decidir(x: Number) {
    let y = <HTMLDivElement>document.getElementById("value");
    var id = y.className;
    y = <HTMLDivElement>document.getElementById("valueu");
    var usu = y.className;
    this.SolisService.deletesoli(id).subscribe((res) => {});
    if (x == 1) {
      this.usuarioService.getusuario(usu).subscribe((res) => {
        var b = res as Usuario;

        this.usuarioService
          .putusuarios(
            usu,
            b.name,
            b.password,
            b.mail,
            "1",
            b.like1,
            b.like2,
            b.like3,
            b.config,
            b.Group,
            b.Like,
            b.Chat,
            b.solis
          )
          .subscribe((res) => {});
      });
    }
  }
}
