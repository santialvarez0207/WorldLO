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
import { OrganizerComponent } from './components/organizer/organizer.component';


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
    OrganizerComponent,
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
