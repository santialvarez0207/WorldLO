import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { NgForm } from "@angular/forms";
import { Usuario } from "src/app/Models/usuario";
import { AppComponent } from "../../app.component";
import { Router } from "@angular/router";
import { basename } from "path";
import { DocumentQuery } from "mongoose";
import { flattenDiagnosticMessageText } from "typescript";
import { PageService } from "../../services/Page.service";
import { Page } from "src/app/Models/page";
import { GroupService } from "../../services/Group.service";
import { Group } from "src/app/Models/Group";

declare var M: any;

@Component({
  selector: "app-Porfile",
  templateUrl: "./Porfile.component.html",
  styleUrls: ["./Porfile.component.css"],
  providers: [UsuarioService],
})
export class PorfileComponent {
  public state: boolean = false;
  constructor(
    public UsuarioService: UsuarioService,
    public PageService: PageService,
    public GroupService: GroupService,
    private router: Router
  ) {}
  correo: string;
  b: Usuario;

  ngOnInit(): void {
    this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
      (res) => {
        this.b = res;
      }
    );
    let boton = document.getElementById("Ms");
    boton.style.visibility = "hidden";
    this.porfile();
  }

  ngOnDestroy() {
    let boton = document.getElementById("Ms");
    boton.style.visibility = "visible";
  }

  porfile() {
    this.eliminar();
    let boton = document.getElementById("changeb");
    boton.style.visibility = "visible";
    let Base = document.getElementById("Sector");
    let Usuario = document.createElement("div");
    Usuario.id = "sector1";
    Base.appendChild(Usuario);
    let Porfile = document.createElement("h1");
    Porfile.innerHTML = "Porfile";
    Porfile.style.textAlign = "center";
    Usuario.appendChild(Porfile);

    let titulo1 = document.createElement("h3");
    titulo1.innerHTML = "Name";
    Usuario.appendChild(titulo1);
    let nombre = document.createElement("input");
    nombre.type = "text";
    nombre.id = "nombre";
    nombre.value = localStorage.getItem("name");
    Usuario.appendChild(nombre);

    let titulo2 = document.createElement("h3");
    titulo2.innerHTML = "Email";
    Usuario.appendChild(titulo2);
    let Correo = document.createElement("input");
    Correo.type = "email";
    Correo.id = "correo";
    Correo.value = localStorage.getItem("Correo");
    Usuario.appendChild(Correo);

    let activate = document.createElement("div");
    activate.className = "switch";
    Usuario.appendChild(activate);
    let label = document.createElement("label");
    label.innerHTML = "Change Password?";
    activate.appendChild(label);
    let input = document.createElement("input");
    input.id = "newc";
    input.type = "checkbox";
    label.appendChild(input);
    let span = document.createElement("span");
    span.className = "lever";
    label.appendChild(span);

    let titulo3 = document.createElement("h3");
    titulo3.innerHTML = "Old Password";
    Usuario.appendChild(titulo3);
    let contraseña = document.createElement("input");
    contraseña.type = "password";
    contraseña.id = "contraseña";
    Usuario.appendChild(contraseña);

    let titulo4 = document.createElement("h3");
    titulo4.innerHTML = "New Password";
    Usuario.appendChild(titulo4);
    let ncontraseña = document.createElement("input");
    ncontraseña.type = "password";
    ncontraseña.id = "ncontraseña";
    Usuario.appendChild(ncontraseña);
  }

  adduser(name: HTMLInputElement, password: string, mail: HTMLInputElement) {
    this.UsuarioService.putusuarios(
      localStorage.getItem("id"),
      name.value,
      password,
      mail.value,
      this.b.tipeuser,
      this.b.like1,
      this.b.like2,
      this.b.like3,
      this.b.config,
      this.b.Group,
      this.b.Like,
      this.b.Chat,
      this.b.solis
    ).subscribe((res) => {
      localStorage.setItem("name", name.value);
      localStorage.setItem("Correo", mail.value);
      M.toast({ html: "update Successfuly" });
    });
  }

  verificacion() {
    let name = <HTMLInputElement>document.getElementById("nombre");
    let n = <HTMLInputElement>document.getElementById("newc");
    let password = <HTMLInputElement>document.getElementById("contraseña");
    let npassword = <HTMLInputElement>document.getElementById("ncontraseña");
    let mail = <HTMLInputElement>document.getElementById("correo");
    let final;

    this.UsuarioService.getusuarios().subscribe((res) => {
      this.state = false;
      this.UsuarioService.usuario = res as Usuario[];
      var h;
      h = this.UsuarioService.usuario.length;
      if (mail.value != localStorage.getItem("Correo")) {
        for (var i = 0; i <= h - 1; i++) {
          if (mail.value == res[i].mail) {
            M.toast({ html: "email in used" });
            this.state = true;
          }
          if (name.value != localStorage.getItem("name"))
            if (name.value == res[i].name) {
              M.toast({ html: "User name in used" });
              this.state = true;
            }
        }
        if (mail.value.indexOf("@") < 0 || mail.value.indexOf(".com") < 0) {
          M.toast({ html: "Email not validate" });
          this.state = true;
        }
      }

      if (name.value.length > 20 || name.value.length < 12) {
        M.toast({ html: "name:  max 20 and min 12" });
        this.state = true;
      }
      if (n.checked == true) {
        this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
          (res) => {
            var x = res as Usuario;
            if (x.password == password.value) {
              if (this.state == false) {
                this.adduser(name, npassword.value, mail);
              }
            } else {
              M.toast({ html: "Password incorrect" });
            }
          }
        );
      } else {
        this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
          (res) => {
            var x = res as Usuario;

            if (this.state == false) {
              this.adduser(name, x.password, mail);
            }
          }
        );
      }
      return this.state;
    });
  }

  eliminar() {
    let Base = document.getElementById("sector1");
    Base.remove();
    let boton = document.getElementById("changeb");
    boton.style.visibility = "hidden";
    boton = document.getElementById("friend");
    boton.style.visibility = "hidden";
    boton = document.getElementById("xd");
    boton.style.visibility = "hidden";
  }

  pagesfav() {
    this.eliminar();
    this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
      (res) => {
        var x = res as Usuario;
        let Base = document.getElementById("Sector");
        let Usuario = document.createElement("div");
        Usuario.id = "sector1";
        Base.appendChild(Usuario);
        let Porfile = document.createElement("h1");
        Porfile.innerHTML = "Favorite Pages";
        Porfile.style.textAlign = "center";
        Usuario.appendChild(Porfile);
        for (var i = 0; i <= x.Like.length - 1; i++) {
          let nombre = document.createElement("h4");
          nombre.innerHTML = x.Like[i].name;
          var link = "./Paginas/" + x.Like[i].id;
          nombre.onclick = function tata() {
            window.location.replace(link);
          };
          Usuario.appendChild(nombre);
        }
      }
    );
  }

  Groupsfavs() {
    this.eliminar();
    this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
      (res) => {
        var x = res as Usuario;
        let Base = document.getElementById("Sector");
        let Usuario = document.createElement("div");
        Usuario.id = "sector1";
        Base.appendChild(Usuario);
        let Porfile = document.createElement("h1");
        Porfile.innerHTML = "Favorite Groups";
        Porfile.style.textAlign = "center";
        Usuario.appendChild(Porfile);
        for (var i = 0; i <= x.Group.length - 1; i++) {
          let nombre = document.createElement("h4");
          nombre.innerHTML = x.Group[i].name;
          var link = "./Group/" + x.Group[i].id;
          nombre.onclick = function tata() {
            window.location.replace(link);
          };
          Usuario.appendChild(nombre);
        }
      }
    );
  }

  MyGroups() {
    this.eliminar();
    this.GroupService.getGroups().subscribe((res) => {
      var x = res as Group[];
      let Base = document.getElementById("Sector");
      let Usuario = document.createElement("div");
      Usuario.id = "sector1";
      Base.appendChild(Usuario);
      let Porfile = document.createElement("h1");
      Porfile.innerHTML = "My Groups";
      Porfile.style.textAlign = "center";
      Usuario.appendChild(Porfile);
      for (var i = 0; i <= x.length - 1; i++) {
        if (x[i].usserid == localStorage.getItem("id")) {
          let nombre = document.createElement("h4");
          nombre.innerHTML = x[i].Name;
          var link = "./Group/" + x[i]._id;
          nombre.onclick = function tata() {
            window.location.replace(link);
          };
          Usuario.appendChild(nombre);
        }
      }
    });
  }

  MyPages() {
    this.eliminar();
    this.PageService.getPaginas().subscribe((res) => {
      var x = res as Page[];
      let Base = document.getElementById("Sector");
      let Usuario = document.createElement("div");
      Usuario.id = "sector1";
      Base.appendChild(Usuario);
      let Porfile = document.createElement("h1");
      Porfile.innerHTML = "My Pages";
      Porfile.style.textAlign = "center";
      Usuario.appendChild(Porfile);
      for (var i = 0; i <= x.length - 1; i++) {
        if (x[i].usserid == localStorage.getItem("id")) {
          let nombre = document.createElement("h4");
          nombre.innerHTML = x[i].title;
          var link = "./Paginas/" + x[i]._id;
          nombre.onclick = function tata() {
            window.location.replace(link);
          };
          Usuario.appendChild(nombre);
        }
      }
    });
  }
  solis: number = 0;

  friend() {
    this.eliminar();
    let boton = document.getElementById("xd");
    boton.style.visibility = "visible";
    let friend = document.getElementById("friend");
    friend.style.visibility = "visible";
    let Base = document.getElementById("Sector");
    let Usuario = document.createElement("div");
    Usuario.id = "sector1";
    Base.appendChild(Usuario);

    this.UsuarioService.getusuario(localStorage.getItem("id")).subscribe(
      (res) => {
        var x = res as Usuario;
        this.b = x;

        for (var i = 0; i <= x.solis.length - 1; i++) {
          this.UsuarioService.getusuario(x.solis[i]).subscribe((res) => {
            var y = res as Usuario;
            let Nombre = document.createElement("h4");
            Nombre.innerHTML = y.name;
            Usuario.appendChild(Nombre);

            let activate = document.createElement("div");
            activate.className = "switch";
            Usuario.appendChild(activate);
            let label = document.createElement("label");
            label.innerHTML = "add friend";
            activate.appendChild(label);
            let input = document.createElement("input");
            input.id = y._id;
            input.type = "checkbox";
            label.appendChild(input);
            let span = document.createElement("span");
            span.className = "lever";
            label.appendChild(span);
          });
        }
      }
    );
  }

  Buscaramigo() {
    let correo = <HTMLInputElement>document.getElementById("findfriends");
    console.log(correo.value);
    this.UsuarioService.getusuarios().subscribe((res) => {
      var list = res as Usuario[];

      for (var i = 0; i <= list.length - 1; i++) {
        console.log(list[i].mail);
        if (list[i].mail == correo.value) {
          var nueva: boolean = true;
          for (var r = 0; r <= list[i].solis.length; r++) {
            if (list[i].solis[r] == localStorage.getItem("id")) {
              nueva = false;
            }
          }

          for (var r = 0; r <= list[i].Chat.length - 1; r++) {
            if (list[i].Chat[r].idFriend == localStorage.getItem("id")) {
              nueva = false;
            }
          }
          for (var r = i; r <= this.b.solis.length - 1; r++) {
            if (this.b.solis[r] == list[i]._id) {
              nueva = false;
            }
          }

          if (nueva == true) {
            list[i].solis[list[i].solis.length] = localStorage.getItem("id");
            this.UsuarioService.putusuarios(
              list[i]._id,
              list[i].name,
              list[i].password,
              list[i].mail,
              list[i].tipeuser,
              list[i].like1,
              list[i].like2,
              list[i].like3,
              list[i].config,
              list[i].Group,
              list[i].Like,
              list[i].Chat,
              list[i].solis
            ).subscribe((es) => {});
            break;
          }
        }
      }
    });
  }

  Solicitudes() {
    var aceptados: Array<String>;
    for (var i = 0; i <= this.b.solis.length - 1; i++) {
      let acept = <HTMLInputElement>document.getElementById(this.b.solis[i]);
      console.log("friend" + i);
      if (acept.checked == true) {
        this.UsuarioService.getusuario(this.b.solis[i]).subscribe((res) => {
          var amigo = res as Usuario;
          this.b.Chat[this.b.Chat.length] = {
            ultimo: "1",
            idFriend: res._id,
            NameFriend: amigo.name,
            mensaje: ["You are my new Friend ^^"],
            orden: ["2"],
          };

          for (var r = i; r <= this.b.solis.length - 2; r++) {
            this.b.solis[i] = this.b.solis[i + 1];
          }
          this.b.solis.length = this.b.solis.length - 1;

          this.UsuarioService.putusuarios(
            localStorage.getItem("id"),
            this.b.name,
            this.b.password,
            this.b.mail,
            this.b.tipeuser,
            this.b.like1,
            this.b.like2,
            this.b.like3,
            this.b.config,
            this.b.Group,
            this.b.Like,
            this.b.Chat,
            this.b.solis
          ).subscribe((res) => {});

          amigo.Chat[amigo.Chat.length] = {
            ultimo: "1",
            idFriend: this.b._id,
            NameFriend: this.b.name,
            mensaje: ["You are my new Friend ^^"],
            orden: ["2"],
          };
          this.UsuarioService.putusuarios(
            amigo._id,
            amigo.name,
            amigo.password,
            amigo.mail,
            amigo.tipeuser,
            amigo.like1,
            amigo.like2,
            amigo.like3,
            amigo.config,
            amigo.Group,
            amigo.Like,
            amigo.Chat,
            amigo.solis
          ).subscribe((res) => {});
        });
      }
    }
  }

  Salir() {
    localStorage.removeItem("id");
    localStorage.removeItem("Correo");
    localStorage.removeItem("name");
    window.location.replace("./aboutus  ");
  }
}
