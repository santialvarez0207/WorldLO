import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/Group.service";
import { UsuarioService } from "../../services/usuario.service";
import { Group } from "src/app/Models/group";
import { PublicG } from "src/app/Models/PublicG";
import { Usuario } from "src/app/Models/usuario";
import { AppComponent } from "../../app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { text } from "express";
import { PublicGService } from "src/app/services/PublicG.service";
import { Imagenes } from "src/app/Models/imagenes";
import { ImagenesService } from "../../services/imagenes.service";

declare var M: any; // esta es una variable que utiliza materialize
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: "app-Gvisualize",
  templateUrl: "./Gvisualize.component.html",
  styleUrls: ["./Gvisualize.component.css"],
  providers: [GroupService, UsuarioService],
})
export class GVisualizecomponent implements OnInit {
  constructor(
    private usuarioservice: UsuarioService,
    private groupService: GroupService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private publicGService: PublicGService,
    public imagenservice: ImagenesService
  ) {}
  id: string;
  favoritestate: boolean = false;
  new: boolean = true;
  photoSelected: string | ArrayBuffer;
  file: File;
  b: Group;
  seguidor: boolean = false;
  usuario: Usuario;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"]; // toma el parametro :id del url y lo guarda
      console.log(this.id);
      this.comprobar(this.id);
    });

    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".parallax");
      var instances = M.Parallax.init(elems);
    });

    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
    });
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  comprobar(a: string) {
    // comprueba si la persona es la creadora y genera un boton la cual le permite borrar la pagina
    this.groupService.getGroup(a).subscribe((res) => {
      this.b = res as Group;
      let x = <HTMLImageElement>document.getElementById("imagen");
      x.src = "http://localhost:3000/" + this.b.imgUrl; //cambia el predeterminado
      let title = document.getElementById("nombre");
      title.innerHTML = this.b.Name; //Nombre del grupo
      let introduction = document.getElementById("indroduction");
      introduction.innerHTML = this.b.Description; //Descrpcion del grupo
      var admin: boolean = false;
      if (
        localStorage.getItem("id") == null ||
        localStorage.getItem("id") == ""
      ) {
        let Texto = document.getElementById("sector11");
        Texto.remove();
        Texto = document.getElementById("sector111");
        Texto.remove();
        var f = document.getElementById("sector1");
        f.remove();
      } else {
        this.usuarioservice
          .getusuario(localStorage.getItem("id"))
          .subscribe((res) => {
            this.usuario = res as Usuario;

            if (
              this.b.usserid == localStorage.getItem("id") ||
              this.usuario.tipeuser == "2"
            ) {
              //verifica si es el creador
              admin = true;
              let delet = document.createElement("a");
              delet.textContent = "Delete?";
              document.getElementById("sector1").appendChild(delet);
            } else {
              let Texto = document.getElementById("sector11");
              Texto.remove();
              Texto = document.getElementById("sector111");
              Texto.remove();
              var f = document.getElementById("sector1");
              f.remove();
            }

            if (admin == false) {
            }
          });
      }
      this.follower();
      console.log(res);
      console.log(this.b.Public.length);
      for (var i = 0; i <= this.b.Public.length - 1; i++) {
        this.publicaciones(
          //mostrar todas las publicaciones
          "http://localhost:3000/" + this.b.Public[i].imagen,
          this.b.Public[i].cont,
          this.b.Public[i].Name,
          this.b.Public[i].lDate
        );
      }
    });
  }

  botton_delete() {
    let Texto = document.createElement("h5");
    Texto.textContent = "Do you want to delete this group?";
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector1").appendChild(Texto);
  } //relleno

  delete() {
    this.groupService.deleteGroup(this.id).subscribe((res) => {
      console.log(res); //envia "Delete" y elimina el grupo
      this.router.navigate(["/Explorar"]); //Redirecciona
    });
  }

  agregar(a: HTMLInputElement, b: HTMLTextAreaElement) {}
  publicaciones(a: string, b: string, c: string, d: string) {
    let n = document.createElement("div"); //crear el cuadro
    n.style.left = "10%";
    n.className = "card z-depth-3";
    n.style.width = "80%";
    document.getElementById("Public").appendChild(n);

    if (a != "http://localhost:3000/none") {
      //mostrar la imagen
      let Imagen = document.createElement("img");
      Imagen.style.marginLeft = "25%";
      Imagen.style.background = "#ff5733";
      Imagen.src = a;
      Imagen.style.width = "50%";
      Imagen.style.height = "300px";
      n.appendChild(Imagen);
    }

    let Texto = document.createElement("p"); //contenido
    Texto.textContent = b;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);

    Texto = document.createElement("p"); // nombre del creador
    Texto.textContent = "By: " + c;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.color = "#581845";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);

    Texto = document.createElement("p");
    Texto.textContent = d;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.color = "#581845";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto); //fecha
  }

  follower() {
    this.seguidor = false;
    var admin: boolean = false;
    var a = this.b.Users.length;

    console.log(this.b.Users.length);
    for (var i = 0; i <= a - 1; i++) {
      if (this.b.Users[i].idUser == localStorage.getItem("id")) {
        //mira quienes sigue
        this.seguidor = true;
        if (this.b.Users[i].Admin == "1") {
          //verifica si es admin
          admin = true;
        }
      }
    }
    if (this.seguidor == true) {
      let alpha = document.getElementById("seguir");
      alpha.innerHTML = "Stop following";
    } else {
      let alpha = document.getElementById("seguir");
      alpha.innerHTML = "Following";
    }
    if (
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == null
    ) {
      let alpha = document.getElementById("seguir");
      alpha.innerHTML = "Register";
      alpha.className = "waves-effect waves-light btn-small disabled";
    }
    if (this.b.usserid == localStorage.getItem("id")) {
      let alpha = document.getElementById("seguir");
      this.seguidor = true;
      admin = true;
      this.tabla();
      alpha.innerHTML = "You are the owner";
      alpha.className = "waves-effect waves-light btn-small disabled"; //si es dueño, no puede dejar de seguir
    } else {
    }
    if (admin == false) {
      let envio = document.getElementById("envios"); //si no es admin no puede publicar
      envio.remove();
    }
  }

  seguir() {
    this.groupService.getGroup(this.id).subscribe((res) => {
      this.b = res as Group;
      if (this.seguidor == true) {
        var a = this.b.Users.length;
        console.log(a);
        for (var i = 0; i <= a - 2; i++) {
          //mirar
          if (this.b.Users[i].idUser == localStorage.getItem("id")) {
            //verifica lo posicion
            for (var ii = i; ii <= this.b.Users.length - 2; ii++) {
              //rellenar el puesto
              this.b.Users[ii] = this.b.Users[ii + 1]; //comienza a remplazar
            }
          }
        }
        this.b.Users.length = this.b.Users.length - 1; //elimina el duplicado
      }

      if (this.seguidor == false) {
        this.b.Users[this.b.Users.length] = {
          //en la posicion maxima
          idUser: localStorage.getItem("id"),
          Name: localStorage.getItem("name"),
          Admin: "0",
        };
      }

      this.groupService //actualiza los datos de la pagina
        .putGroup(
          this.id,
          this.b.Name,
          this.b.Description,
          this.b.usserid,
          this.b.ussename,
          this.b.Users,
          this.b.Public,
          this.b.imgUrl
        )
        .subscribe((res) => {
          this.seguirUsuario();
          console.log(this.follower);
        });
    });
  }

  obtener() {
    let conts = <HTMLTextAreaElement>document.getElementById("cont");
    var x = conts.value;
    let img = <HTMLInputElement>document.getElementById("img");
    var f: File = img.files[0];
    console.log(f);
    if (f != undefined) {
      this.groupService.getGroup(this.id).subscribe((res) => {
        this.b = res as Group;
        let fecha = new Date();
        this.imagenservice.postImagenes([f], 1).subscribe((ress) => {
          let xx = ress as Imagenes;
          this.b.Public[this.b.Public.length] = {
            idUser: localStorage.getItem("id"), //id del creador de la publi
            Name: localStorage.getItem("name"), //nombre del creador de la publi
            imagen: xx.U[0].path, //nombre de como guardo la imagen
            cont: x,
            //tomar la fecha dia,mes,año minuto:hora
            lDate:
              fecha.getDate() +
              "/" +
              fecha.getMonth() +
              "/" +
              fecha.getFullYear() +
              "/ " +
              fecha.getHours() +
              ":" +
              fecha.getMinutes(),
          };
          this.groupService
            .putGroup(
              this.id,
              this.b.Name,
              this.b.Description,
              this.b.usserid,
              this.b.ussename,
              this.b.Users,
              this.b.Public,
              this.b.imgUrl
            )
            .subscribe((res) => {});
        });
      });
    } else {
      this.groupService.getGroup(this.id).subscribe((res) => {
        this.b = res as Group;
        let fecha = new Date();
        this.b.Public[this.b.Public.length] = {
          idUser: localStorage.getItem("id"),
          Name: localStorage.getItem("name"),
          imagen: "none", //si no se guardo coloca none
          cont: x,
          lDate:
            fecha.getDate() +
            "/" +
            fecha.getMonth() +
            "/" +
            fecha.getFullYear() +
            "  " +
            fecha.getHours() +
            ":" +
            fecha.getMinutes(),
        };
        this.groupService
          .putGroup(
            this.id,
            this.b.Name,
            this.b.Description,
            this.b.usserid,
            this.b.ussename,
            this.b.Users,
            this.b.Public,
            this.b.imgUrl
          )
          .subscribe((res) => {});
      });
    }
  }

  seguirUsuario() {
    this.usuarioservice
      .getusuario(localStorage.getItem("id"))
      .subscribe((res) => {
        let b = res as Usuario;
        if (this.seguidor == true) {
          var a = b.Group.length;
          for (var i = 0; i <= a - 2; i++) {
            if (b.Group[i].id == this.id) {
              //posicion
              for (var ii = i; ii <= b.Group.length - 2; ii++) {
                //remplazar
                b.Group[ii] = b.Group[ii + 1]; //por el de arriba
              }
            }
          }
          b.Group.length = b.Group.length - 1; //elimina el duplicado
        }
        if (this.seguidor == false) {
          b.Group[b.Group.length] = { name: this.b.Name, id: this.id }; //mete la nueva pagina a la lista
        }
        this.usuarioservice //actualiza el usuario
          .putusuarios(
            b._id,
            b.name,
            b.password,
            b.mail,
            b.tipeuser,
            b.like1,
            b.like2,
            b.like3,
            b.config,
            b.Group,
            b.Like,
            b.Chat,
            b.solis
          )
          .subscribe((res) => {
            this.follower(); //atualize lo que dice el boton
            console.log(res);
          });
      });
  }

  tabla() {
    //se agregan todos los usuarios
    for (var i = 0; i <= this.b.Users.length - 1; i++) {
      let tr = document.createElement("tr");
      document.getElementById("tabla").appendChild(tr);
      let td = document.createElement("td");
      td.innerHTML = this.b.Users[i].Name; //nombre
      tr.appendChild(td);
      //Tr: es la linea
      //Td: los datos
      td = document.createElement("td");
      tr.appendChild(td);
      /*
      <label>
        <input type="checkbox" />
        <span>Red</span>
      </label>
*/
      //se debe seguir la anterior estructura para que se pueda ver bien
      //para seguir la indicacion de materizalice ^
      let div = document.createElement("div"); // comieza a adaptar para que vea como un checkbox
      div.className = "switch";
      td.appendChild(div);
      let label = document.createElement("label");
      div.appendChild(label);
      let input = document.createElement("input");
      input.id = "User" + i;
      input.type = "checkbox";

      if (this.b.Users[i].Admin == "1") {
        //si es admin
        input.checked = true;
      }

      input.value = this.b.Users[i].idUser;
      label.appendChild(input);
      let span = document.createElement("span");
      span.className = "lever";
      label.appendChild(span); //agrega todo a la tabla
    }
  }

  prueba() {
    this.groupService.getGroup(this.id).subscribe((res) => {
      this.b = res as Group;
      for (var i = 0; i <= this.b.Users.length - 1; i++) {
        let valor = <HTMLInputElement>document.getElementById("User" + i);
        //va por todos los usuarios
        for (var i = 0; i <= this.b.Users.length - 1; i++) {
          if (this.b.Users[i].idUser == valor.value) {
            //verifican si los id coinciden
            console.log(valor.checked);
            if (valor.checked == true) {
              this.b.Users[i].Admin = "1"; //se convierte en admin
            }
          }
          if (valor.checked == false) {
            //es mortal
            this.b.Users[i].Admin = "0";
          }
        }
      }

      this.groupService
        .putGroup(
          this.id,
          this.b.Name,
          this.b.Description,
          this.b.usserid,
          this.b.ussename,
          this.b.Users,
          this.b.Public,
          this.b.imgUrl
        )
        .subscribe((res) => {}); //se actualizan los roles
    });
  }
}
