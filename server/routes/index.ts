import { Router } from 'express' // utilizamos router de express el cual nos permitira encaminar todo los datos
const router = Router();

import upload from '../Libs/storage' //libreria que se utiliza para subir los archivos
//diferentes controladores de la base de datos
import { getQuestions, createQuestion, getQuestion, deleteQuestion, updateQuestion } from '../controllers/question.controller'
import { getExams, createExam, getExam, deleteExam, updateExam } from '../controllers/Exam.controller'
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/usuario.controller'
import { getPaginas, createPagina, getPagina,updatePagina,deletePagina } from '../controllers/paginas.controller';
import { getGroup, createGroup, getGroups, deleteGroup, updateGroup } from '../controllers/Group.controller'
import { getPublicG, createPublicG, getPublicGs,updatePublicG,deletePublicG } from '../controllers/PublicG.controller';
// rutas----
router.route('/Usuarios')
    .get(getUsers)
    .post(createUser);

router.route('/Usuarios/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);
//paginas------------------------------------------
router.route('/Paginas')
    .get(getPaginas)
    .post(upload.single('image'),createPagina);
router.route('/Paginas/:id')
    .delete(deletePagina)
    .get(getPagina)
    .put(updatePagina);
//Examenes------------------------------------------
router.route('/Exam')
    .get(getExams)
    .post(upload.single('image'),createExam);

router.route('/Exam/:id')
    .delete(deleteExam)
    .get(getExam)
    .put(updateExam);
//preguntas------------------------------------------
router.route('/Question')
    .get(getQuestions)
    .post(createQuestion);

router.route('/Question/:id')
    .delete(deleteQuestion)
    .get(getQuestion)
    .put(updateQuestion);
//Grupos------------------------------------------
router.route('/Group')
    .get(getGroups)
    .post(upload.single('image'),createGroup);

router.route('/Group/:id')
    .delete(deleteGroup)
    .get(getGroup)
    .put(updateGroup);
//Publicaciones Grupos------------------------------------------
router.route('/PublicG')
    .get(getPublicG)
    .post(createPublicG);

router.route('/PublicG/:id')
    .delete(deletePublicG)
    .get(getPublicGs)
    .put(updatePublicG);


export default router;