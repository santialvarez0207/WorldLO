import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ɵCurrencyIndex,
} from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { NgForm } from "@angular/forms";
import { Usuario } from "src/app/Models/usuario";
import { AppComponent } from "../../app.component";
import { Router } from "@angular/router";
import { ExpressionStatement } from "@angular/compiler";

declare var M: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
  providers: [UsuarioService],
})
export class UsuariosComponent implements OnInit {
  state: boolean;
  constructor(public UsuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.getUsuario();

    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }

  adduser(
    name: HTMLInputElement,
    password: HTMLInputElement,
    mail: HTMLInputElement
  ) {
    if (this.state == false) {
      this.UsuarioService.postusuarios(
        name.value,
        password.value,
        mail.value,
        "0"
      ).subscribe((res) => {
        M.toast({ html: "Register Successfuly, now logget" }); // mmuestra en pantalla mensaje
        this.getUsuario();
      });
    }
  }

  getUsuario() {
    this.UsuarioService.getusuarios().subscribe((res) => {
      this.UsuarioService.usuario = res as Usuario[];
      console.log(res);
    });
  }

  //toma los valores del login
  login() {
    let x, y;
    x = <HTMLInputElement>document.getElementById("email1");
    y = <HTMLInputElement>document.getElementById("password1");

    this.loginuser(y, x);
  }

  //toma los valores para regristrar
  register() {
    let x, y, z;
    x = <HTMLInputElement>document.getElementById("email");
    y = <HTMLInputElement>document.getElementById("password");
    z = <HTMLInputElement>document.getElementById("name");

    this.verificacion(z, y, x);
  }

  loginuser(password: HTMLInputElement, mail: HTMLInputElement) {
    this.UsuarioService.getusuarios().subscribe((res) => {
      this.UsuarioService.usuario = res as Usuario[];
      var h;
      h = this.UsuarioService.usuario.length;
      for (var i = 0; i <= h - 1; i++) {
        // pasar todos los usuaros registrados
        if (mail.value == res[i].mail) {
          // concuerda con el correo
          if (password.value == res[i].password) {
            // si la contraseña es correcta
            this.state = true;
            localStorage.setItem("id", res[i]._id); //cache
            localStorage.setItem("name", res[i].name);
            localStorage.setItem("Correo", res[i].mail);
            this.true();
          } else {
            M.toast({ html: "password incorrect" }); //mensaje si la contraseña es incorrecta
          }
        }
      }
    });
  }

  public true() {
    window.location.reload();
    M.toast({ html: "Login Succesfully , now explorer :D" });
  }

  verificacion(
    name: HTMLInputElement,
    password: HTMLInputElement,
    mail: HTMLInputElement
  ) {
    this.UsuarioService.getusuarios().subscribe((res) => {
      this.state = false;
      this.UsuarioService.usuario = res as Usuario[];
      var h;
      h = this.UsuarioService.usuario.length; //mira el tamaño de la base de datos
      for (var i = 0; i <= h - 1; i++) {
        //verifica si el correo ya esta en uso
        if (mail.value == res[i].mail) {
          M.toast({ html: "email in used" });
          this.state = true;
        }
        // si el nombre esta en uso
        if (name.value == res[i].name) {
          M.toast({ html: "User name in used" });
          this.state = true;
        }
      }
      // nombre -12 y +20
      if (name.value.length > 20 || name.value.length < 12) {
        M.toast({ html: "name:  max 20 and min 12" });
        this.state = true;
      }
      // correo tiene @ y .com
      if (mail.value.indexOf("@") < 0 || mail.value.indexOf(".com") < 0) {
        M.toast({ html: "Email not validate" });
        this.state = true;
      }

      // llama funcion
      if (this.state == false) {
        this.adduser(name, password, mail);
      }
      return this.state;
    });
  }
}
