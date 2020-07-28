  
import multer from 'multer' //es la libreria para guardar archivos
import path from 'path'
import uuid from 'uuid/v4'; // este genera un nombre aleatoreo , con el cual evitamos que los archivos tengan el mismo nombre ocacionando problemas

// Settings
const storage = multer.diskStorage({
    destination: 'Storage', // carpeta donde se dirige los archivos
    filename: (req, file, cb) => { //preocesado del archivo
        cb(null, uuid() + path.extname(file.originalname)) // guardado del archivo + nombre
    }
});
export default multer({storage});