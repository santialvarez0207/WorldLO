import app from './app';
import { startConnection } from './database'


async function main() { //conexion con el servidor en especifico el puerto
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();