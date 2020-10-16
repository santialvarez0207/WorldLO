import { Router } from "express"; // utilizamos router de express el cual nos permitira encaminar todo los datos
const router = Router();

import upload from "../Libs/storage"; //libreria que se utiliza para subir los archivos
//diferentes controladores de la base de datos
import {
  getQuestions,
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/question.controller";
import {
  getExams,
  createExam,
  getExam,
  deleteExam,
  updateExam,
} from "../controllers/Exam.controller";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/usuario.controller";
import {
  getPaginas,
  createPagina,
  getPagina,
  updatePagina,
  deletePagina,
} from "../controllers/paginas.controller";
import {
  getGroup,
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
} from "../controllers/Group.controller";
import {
  getPublicG,
  createPublicG,
  getPublicGs,
  updatePublicG,
  deletePublicG,
} from "../controllers/PublicG.controller";
import {
  getImagenes,
  createImagenes,
  getImageness,
  updateImagenes,
  deleteImagenes,
} from "../controllers/imagenes.controller";
import {
  getVideo,
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller";

import {
  createSoli,
  getSoli,
  getSolis,
  updateSoli,
  deleteSoli,
  clave,
} from "../controllers/solicitud.controller";
// rutas----
//localhost:3000/Usuarios
router.route("/Usuarios").get(getUsers).post(createUser);

router.route("/Usuarios/:id").get(getUser).delete(deleteUser).put(updateUser);
//paginas------------------------------------------
router
  .route("/Paginas")
  .get(getPaginas)
  .post(upload.single("image"), createPagina);
router
  .route("/Paginas/:id")
  .delete(deletePagina)
  .get(getPagina)
  .put(updatePagina);
//Examenes------------------------------------------
router.route("/Exam").get(getExams).post(createExam);

router.route("/Exam/:id").delete(deleteExam).get(getExam).put(updateExam);
//preguntas------------------------------------------
router.route("/Question").get(getQuestions).post(createQuestion);

router
  .route("/Question/:id")
  .delete(deleteQuestion)
  .get(getQuestion)
  .put(updateQuestion);
//Grupos------------------------------------------
router.route("/Group").get(getGroups).post(upload.single("image"), createGroup);

router.route("/Group/:id").delete(deleteGroup).get(getGroup).put(updateGroup);
//Publicaciones Grupos------------------------------------------
router.route("/PublicG").get(getPublicG).post(createPublicG);

router
  .route("/PublicG/:id")
  .delete(deletePublicG)
  .get(getPublicGs)
  .put(updatePublicG);
//Imagenes------------------------------------------
router
  .route("/Imagenes")
  .get(getImageness)
  .post(upload.array("image"), createImagenes);

router
  .route("/Imagenes/:id")
  .delete(deleteImagenes)
  .get(getImagenes)
  .put(updateImagenes);
//Video------------------------------------------
router.route("/Debate").get(getVideos).post(createVideo);

router.route("/debate/:id").delete(deleteVideo).get(getVideo).put(updateVideo);

router.route("/solis").get(getSolis).post(createSoli);

router.route("/solis/:id").delete(deleteSoli).get(getSoli).put(updateSoli);

router.route("/clave").post(clave);

export default router;
