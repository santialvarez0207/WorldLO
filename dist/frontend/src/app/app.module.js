"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const app_routes_1 = require("./app-routes");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const usuarios_component_1 = require("./Components/usuarios/usuarios.component");
const Home_component_1 = require("./Components/Home/Home.component");
const Creacion_component_1 = require("./Components/Creacion/Creacion.component");
const ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
const Porfile_component_1 = require("./Components/Porfile/Porfile.component");
const Paginas_component_1 = require("./Components/Paginas/Paginas.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            usuarios_component_1.UsuariosComponent,
            Home_component_1.HomeComponent,
            Porfile_component_1.PorfileComponent,
            Creacion_component_1.Creacioncomponent,
            Paginas_component_1.Paginascomponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            app_routes_1.app_routing,
            ngx_infinite_scroll_1.InfiniteScrollModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
