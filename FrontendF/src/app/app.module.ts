import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { app_routing} from './app-routes'
import {FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { HomeComponent } from './Components/Home/Home.component';
import { Creacioncomponent } from './Components/Creacion/Creacion.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PorfileComponent } from './Components/Porfile/Porfile.component';
import { Paginascomponent } from './Components/Paginas/Paginas.component';
import { Explorarcomponent } from './Components/Explorar/Explorar.component';
import { CExamenesComponent } from './Components/CExamenes/CExamenes.component';
import { ExamcVisualiomponent } from './Components/Examenes/Examenes.component';
import { Gcreatecomponent } from './Components/Gcreate/Gcreate.component';
import { GVisualizecomponent  } from './Components/Gvisualize/Gvisualize.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { HerramientasComponent } from './Components/herramientas/herramientas.component';
import { DeathStarComponent } from './components/death-star/death-star.component';
import { ChatComponent } from './Components/chat/chat.component';
import { DebateComponent } from './components/debate/debate.component';
import { VerdebateComponent } from './components/verdebate/verdebate.component';
import { CrearsolisComponent } from './components/crearsolis/crearsolis.component';
import { AdministradorComponent } from './components/administrador/administrador.component';


//modulos que utilizaran los diferentes archivos o sectores
//sectores 
@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    HomeComponent,
    PorfileComponent,
    Creacioncomponent,
    Paginascomponent,
    Explorarcomponent,
    CExamenesComponent,
    ExamcVisualiomponent,
    Gcreatecomponent,
    GVisualizecomponent,
    AboutusComponent,
    HerramientasComponent,
    DeathStarComponent,
    ChatComponent,
    DebateComponent,
    VerdebateComponent,
    CrearsolisComponent,
    AdministradorComponent,
  ],
  //modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    app_routing,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
