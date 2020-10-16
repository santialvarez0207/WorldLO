import { Component, OnInit } from "@angular/core";
import { Stream } from "stream";
import { areAllEquivalent } from "@angular/compiler/src/output/output_ast";
import { SocketsService } from "../../services/sockets.service";
import { async } from "@angular/core/testing";
import { DebateService } from "../../services/debate.service";
import { Debate } from "../../Models/Debate";
import { CONTEXT_NAME } from "@angular/compiler/src/render3/view/util";

@Component({
  selector: "app-debate",
  templateUrl: "./debate.component.html",
  styleUrls: ["./debate.component.css"],
})
export class DebateComponent implements OnInit {
  constructor(
    private socketService: SocketsService,
    private debateService: DebateService
  ) {}
  canvas = document.querySelector;

  media: {
    id: string;
    tipo: string;
    video: any;
  };

  noc;
  id: string;
  tipo: string;

  ioConnection: any;

  ngOnInit(): void {
    this.initIoConnection();
  }

  private punta(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 320, height: 240 },
      })
      .then((media) => {
        let video = <HTMLVideoElement>(
          document.getElementById("previsualizacion")
        );
        video.srcObject = media;
        video.style.display = "none";
        let canvas = <HTMLCanvasElement>document.getElementById("video");
        canvas.width = 320;
        canvas.height = 240;
        this.noc = media.getAudioTracks();
        let context = canvas.getContext("2d");
        setInterval(function () {
          context.drawImage(video, 0, 0, 320, 240);
        }, 70);
      })
      .catch((err) => console.log(err));
  }

  private initIoConnection(): void {
    this.socketService.setupSocketConnection();
    this.ioConnection = this.socketService.onvideo().subscribe((Video: any) => {
      this.hola(Video);
    });
  }

  hola(Video) {
    this.media = Video;
    if (this.media.id == this.id && this.media.tipo != this.tipo) {
      let x = <HTMLImageElement>document.getElementById("stream");
      x.src = this.media.video;
    }
  }

  envio() {
    let x = <HTMLMediaElement>document.getElementById("previsualizacion");
    console.log(btoa(x.src));
    console.log(this.noc);

    let canvas = <HTMLCanvasElement>document.getElementById("video");
    this.socketService.video({
      id: this.id,
      tipo: this.tipo,
      video: canvas.toDataURL("image/webq"),
    });
    console.log(canvas.toDataURL("image/webq"));
    setTimeout(() => {
      this.envio();
    }, 70);
  }

  crear() {
    let nombre = <HTMLInputElement>document.getElementById("name");
    let password = <HTMLInputElement>document.getElementById("password");

    this.debateService
      .postDebate(nombre.value, localStorage.getItem("id"), password.value)
      .subscribe((res) => {
        let y = res as Debate;
        this.id = y._id;
        let ids = <HTMLElement>document.getElementById("ids");
        ids.innerHTML = "Id: " + y._id;
        this.tipo = "1";
        this.punta();
        this.envio();
      });
  }

  unirse() {
    let nombre = <HTMLInputElement>document.getElementById("name1");
    let password = <HTMLInputElement>document.getElementById("password1");
    let id = <HTMLInputElement>document.getElementById("id");
    this.debateService.getDebates().subscribe((res) => {
      let y = res as Debate[];
      for (var i = 0; i <= y.length - 1; i++) {
        if (
          y[i].name == nombre.value &&
          y[i].password == password.value &&
          y[i]._id == id.value
        ) {
          this.id = y[i]._id;
          this.tipo = "2";
          this.punta();
          this.envio();
        }
      }
    });
  }
}
