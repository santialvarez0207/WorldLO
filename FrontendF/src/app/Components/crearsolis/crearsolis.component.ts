import { Component, Input, OnInit } from "@angular/core";
import { Soli } from "src/app/Models/Solis";
import { Imagenes } from "src/app/Models/Imagenes";
import { ImagenesService } from "../../services/imagenes.service";
import { SolisService } from "../../services/solis.service";
declare var M: any;
@Component({
  selector: "app-crearsolis",
  templateUrl: "./crearsolis.component.html",
  styleUrls: ["./crearsolis.component.css"],
})
export class CrearsolisComponent implements OnInit {
  constructor(
    private ImagenesService: ImagenesService,
    private SolisService: SolisService
  ) {}
  datos: Array<string> = [];
  f: Array<File> = [];
  fe: Array<string> = [];
  ngOnInit(): void {}

  send() {
    let x = <HTMLInputElement>document.getElementById("name");
    this.datos[0] = x.value;
    x = <HTMLInputElement>document.getElementById("sur");
    this.datos[1] = x.value;
    x = <HTMLInputElement>document.getElementById("mail");
    this.datos[2] = x.value;
    x = <HTMLInputElement>document.getElementById("stu");
    this.datos[3] = x.value;
    x = <HTMLInputElement>document.getElementById("url");
    this.datos[4] = x.value;
    x = <HTMLInputElement>document.getElementById("job");
    this.datos[5] = x.value;
    x = <HTMLInputElement>document.getElementById("cou");
    this.datos[9] = x.value;
    x = <HTMLInputElement>document.getElementById("dir");
    this.datos[6] = x.value;
    x = <HTMLInputElement>document.getElementById("pho");
    this.datos[7] = x.value;
    let ch = <HTMLInputElement>document.getElementById("18");
    this.datos[8] = ch.value;
    x = <HTMLInputElement>document.getElementById("i1");
    this.f[0] = x.files[0];
    x = <HTMLInputElement>document.getElementById("i2");
    this.f[1] = x.files[0];
    x = <HTMLInputElement>document.getElementById("i3");
    this.f[2] = x.files[0];
    if (ch.checked == true) {
      this.ImagenesService.postImagenes(this.f, 3).subscribe((res) => {
        let x = res as Imagenes;
        this.fe[0] = x.U[0].path;
        this.fe[1] = x.U[1].path;
        this.fe[2] = x.U[2].path;
        let fecha = new Date();
        let lDate: string =
          fecha.getDate() +
          "/" +
          fecha.getMonth() +
          "/" +
          fecha.getFullYear() +
          "/ " +
          fecha.getHours() +
          ":" +
          fecha.getMinutes();

        this.SolisService.postsoli(
          localStorage.getItem("name"),
          this.datos[2],
          localStorage.getItem("id"),
          "0",
          lDate,
          this.fe,
          this.datos
        ).subscribe((ress) => {
          console.log(ress);
        });
      });
    } else {
      M.toast({ html: "Not +18?" });
    }
  }
}
