import { Component, OnInit } from '@angular/core';
import { GroupService } from "../../services/Group.service";
import { UsuarioService } from "../../services/usuario.service";
import { Group } from 'src/app/Models/group';
import { PublicG } from 'src/app/Models/PublicG';
import { Usuario } from 'src/app/Models/usuario';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { text } from 'express';
import { PublicGService } from 'src/app/services/PublicG.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-Gvisualize',
  templateUrl: './Gvisualize.component.html',
  styleUrls: ['./Gvisualize.component.css'],
  providers: [GroupService, UsuarioService]

})

export class GVisualizecomponent implements OnInit {
  constructor(private usuarioservice: UsuarioService, private groupService: GroupService, private router: Router, private activatedRoute: ActivatedRoute, private publicGService: PublicGService) { }
  id: string;
  favoritestate: boolean = false;
  new: boolean = true;
  photoSelected: string | ArrayBuffer;
  file: File;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.comprobar(this.id);
    });
    this.publicaciones('http://localhost:3000/Storage\\Notfound.png', "hola", "c"); // prueba de publicacion

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

  comprobar(a: string) { // comprueba si la persona es la creadora y genera un boton la cual le permite borrar la pagina
    this.groupService.getGroup(a).subscribe(res => {
      var b = res as Group;
      var admin: boolean = false;
      for (var i = 0; i <= b.Admins.length - 1; i++) {
        if (b.Admins[i] == localStorage.getItem("id")) {
          admin = true;
          let delet = document.createElement("a")
          delet.textContent = "Delete?";
          document.getElementById("sector1").appendChild(delet);
        }
      }
      if (admin == false) {
        var f = document.getElementById("sector1")
        f.remove();
      }

      console.log(res);
      this.Title(b.Name);
      this.Imagen("http://localhost:3000/" + b.imgUrl);
      this.Intro(b.Description);
      var h;

      if (localStorage.getItem("id") == b.usserid) {
      } else {
      }
    });
  }


  Title(a: string) {
    let Texto = document.createElement('h3');
    var otracosa = a;
    Texto.style.marginLeft = "2%";
    Texto.style.marginTop = "70px";
    Texto.textContent = otracosa;
    document.getElementById("sector").appendChild(Texto);
  }

  Intro(a: string) {
    let Texto = document.createElement('p');
    var otracosa = a;
    Texto.textContent = otracosa;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector").appendChild(Texto);
  }

  Imagen(a: string) {
    let Imagen = document.createElement('img');
    Imagen.style.marginLeft = "2%";
    Imagen.style.background = "#ff5733";
    Imagen.src = a;
    Imagen.style.width = "96%";
    Imagen.style.height = "100px"
    document.getElementById("sector").appendChild(Imagen);
  }

  botton_delete(a: string) {
    let Texto = document.createElement('h5');
    Texto.textContent = "Do you want to delete this group?"
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "78%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    document.getElementById("sector1").appendChild(Texto);
  }

  delete() {
    this.groupService.deleteGroup(this.id).subscribe(res => {
      console.log(res)
      this.router.navigate(['/Home']);
    });
  }

  agregar(a: HTMLInputElement, b: HTMLTextAreaElement) {

    this.publicGService.postPublicG(a.value, b.value, localStorage.getItem("id"), localStorage.getItem("name"), this.file, localStorage.getItem("id")).subscribe(res => {
      let g = res as PublicG;
      this.publicGService.getPublicGs().subscribe(res => {
        for (var i = res.length - 1; i >= 0; i--) {
          if (g.temp == res[i].temp) {
            var tempid = res[i]._id;
            this.publicGService.putPublicG(tempid, a.value, b.value, localStorage.getItem("id"), localStorage.getItem("name"), "").subscribe(res => {
              this.groupService.getGroup(this.id).subscribe(res => {
                let g2 = res as Group;
                g2.publicgroup[g2.publicgroup.length] = tempid;
                this.groupService.putGroup(this.id, g2.Name, g2.Description, g2.usserid, g2.ussename, g2.Admins, g2.Users, g2.publicgroup)
              })
            })
          }
        }
      })
    })
  }

  publicaciones(a: string, b: string, c: string) {
    let n = document.createElement('div');
    n.style.left = "2%"
    n.className = "card z-depth-3";
    n.style.width = "70%"
    document.getElementById("Public").appendChild(n);
    let Imagen = document.createElement('img');
    Imagen.style.marginLeft = "25%";
    Imagen.style.background = "#ff5733";
    Imagen.src = a;
    Imagen.style.width = "50%";
    Imagen.style.height = "300px"
    n.appendChild(Imagen);
    let Texto = document.createElement('p');
    Texto.textContent = b;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);
    Texto = document.createElement('p');
    Texto.textContent = "By: " + c;
    Texto.style.marginLeft = "2%";
    Texto.style.display = "inline-block";
    Texto.style.width = "30%";
    Texto.style.color = "#581845";
    Texto.style.wordWrap = "break-word";
    Texto.style.marginRight = "20%";
    n.appendChild(Texto);
  }

}








