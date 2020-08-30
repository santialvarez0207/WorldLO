import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketsService } from '../../services/sockets.service'


@Component({
  selector: 'app-verdebate',
  templateUrl: './verdebate.component.html',
  styleUrls: ['./verdebate.component.css']
})
export class VerdebateComponent implements OnInit {

  constructor(private socketService: SocketsService, private activatedRoute: ActivatedRoute) { }

  media:{
    id:string;
    tipo:string;
    video:any
  };
  id:string

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.initIoConnection()
  }
  ioConnection: any;


  private initIoConnection(): void {
    this.socketService.setupSocketConnection();
    this.ioConnection = this.socketService.onvideo()
    .subscribe((Video: any) => {
      this.stream(Video)
    });
  }

  stream(Video){

  
      this.media=Video
      if(this.media.id==this.id && this.media.tipo=="1"){
     let x = <HTMLImageElement>document.getElementById("video1")
     x.src=this.media.video
    }
    if(this.media.id==this.id && this.media.tipo=="2"){
      let x = <HTMLImageElement>document.getElementById("video2")
      x.src=this.media.video
     }

    }
    
  
}
