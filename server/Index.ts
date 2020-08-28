import { startConnection } from './database'
import app from './app';
var server = app.listen(8810);
var io = require('socket.io').listen(server);


io.on('connection', function(socket: any) {
  console.log('a user connected');
  socket.emit('message',"message");
  socket.on("message", function(message: any) {
    io.sockets.emit('message',message);
  });


    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });


  });



async function main() { //conexion con el servidor en especifico el puerto
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();