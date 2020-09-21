import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';;

const SERVER_URL = 'http://localhost:8810';

@Injectable({
  providedIn: 'root'
})


export class SocketsService {
  private socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: string): void {
    this.socket.emit('message', message);
}

public onMessage(): Observable<String> {
return new Observable<String>(observer => {
  this.socket.on('message', (data: String) => observer.next(data));
});
}

public video(video) {
  this.socket.emit('updateImage', video);
}

public onvideo(): Observable<any> {
  return new Observable<any>(observer => {
    this.socket.on('updateImage', (data: any) => observer.next(data));
  }); 
}


}
