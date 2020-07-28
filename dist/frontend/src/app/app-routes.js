"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const usuarios_component_1 = require("./Components/usuarios/usuarios.component");
const Paginas_component_1 = require("./Components/Paginas/Paginas.component");
const Home_component_1 = require("./Components/Home/Home.component");
const Creacion_component_1 = require("./Components/Creacion/Creacion.component");
const Explorar_component_1 = require("./Components/Explorar/Explorar.component");
const Porfile_component_1 = require("./Components/Porfile/Porfile.component");
const app_routes = [
    { path: 'Usuarios', component: usuarios_component_1.UsuariosComponent },
    { path: 'Paginas', component: Paginas_component_1.Paginascomponent },
    { path: 'Home', component: Home_component_1.HomeComponent },
    { path: 'Explorar', component: Explorar_component_1.Explorarcomponent },
    { path: 'Creacion', component: Creacion_component_1.Creacioncomponent },
    { path: 'Porfile', component: Porfile_component_1.PorfileComponent },
    { path: '', pathMatch: 'full', redirectTo: '' }
];
exports.app_routing = router_1.RouterModule.forRoot(app_routes);
