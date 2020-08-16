import {RouterModule,Routes} from '@angular/router';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { Paginascomponent } from './Components/Paginas/Paginas.component';
import { HomeComponent } from './Components/Home/Home.component';
import { Creacioncomponent } from './Components/Creacion/Creacion.component';
import { Explorarcomponent } from './Components/Explorar/Explorar.component';
import { PorfileComponent } from './Components/Porfile/Porfile.component';
import { CExamenesComponent } from './Components/CExamenes/CExamenes.component';
import { ExamcVisualiomponent } from './Components/Examenes/Examenes.component';
import { Gcreatecomponent } from './Components/Gcreate/Gcreate.component';
import { GVisualizecomponent  } from './Components/Gvisualize/Gvisualize.component';
import { AboutusComponent  } from './Components/aboutus/aboutus.component';
import { HerramientasComponent} from './Components/herramientas/herramientas.component';

//la redireccion de las paginas dentro de angular
const app_routes : Routes =[
    {path: 'Usuarios',component: UsuariosComponent},
    {path: 'herramientas',component: HerramientasComponent},
    {path: 'Paginas/:id',component:  Paginascomponent},
    {path: 'Home',component:  HomeComponent},
    {path: 'Explorar',component:  Explorarcomponent},
    {path: 'Creacion',component:  Creacioncomponent},
    {path: 'Porfile',component:  PorfileComponent},
    {path: 'CExamenes',component:  CExamenesComponent},
    {path: 'Examenes/:id',component:  ExamcVisualiomponent},
    {path: 'CreateGroup',component:  Gcreatecomponent},
    {path: 'Group/:id',component:  GVisualizecomponent},
    {path: 'aboutus',component:  AboutusComponent},
    {path: '',pathMatch:'full',redirectTo:''}
];
export const app_routing = RouterModule.forRoot(app_routes);
	
