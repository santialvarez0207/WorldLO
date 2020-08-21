  
import multer from 'multer' //es la libreria para guardar archivos
import path from 'path'
import { v4 as uuidv4 } from 'uuid'; // este genera un nombre aleatoreo , con el cual evitamos que los archivos tengan el mismo nombre ocacionando problemas

// Settings
const storage = multer.diskStorage({
    destination: 'Storage', // carpeta donde se dirige los archivos
    filename: (req, file, cb) => { //preocesado del archivo
        cb(null, uuidv4() + path.extname(file.originalname)) // guardado del archivo + nombre
    }
});
export default multer({storage});