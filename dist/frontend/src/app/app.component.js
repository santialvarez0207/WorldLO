"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Paginas_component_1 = require("./Components/Paginas/Paginas.component");
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.title = 'frontend';
        this.state = false;
    }
    ngOnInit() {
        this.modificate();
    }
    estate() {
    }
    modificate() {
        var a;
        a = localStorage.getItem("id");
        if (a == '') {
            this.noLoga();
            console.log("Hay");
        }
        else {
            this.Loga();
        }
    }
    ;
    Loga() {
        let Texto = document.createElement('a', { is: 'a' });
        var otracosa = localStorage.getItem("name");
        Texto.textContent = otracosa;
        Texto.style.margin = ' 0px 30px';
        Texto.onclick = function tata() {
            window.location.replace('./Porfile');
        };
        document.getElementById("Encabezado").appendChild(Texto);
        Texto = document.createElement('a', { is: 'a' });
        otracosa = "Logout";
        Texto.textContent = otracosa;
        Texto.style.margin = ' 0px 30px';
        Texto.onclick = function tata() {
            localStorage.setItem("id", '');
            localStorage.setItem("name", '');
            localStorage.setItem("Correo", '');
            window.location.replace('./Usuarios');
        };
        document.getElementById("Encabezado").appendChild(Texto);
    }
    noLoga() {
        let Texto = document.createElement('a', { is: 'a' });
        var otracosa = 'Login';
        Texto.textContent = otracosa;
        Texto.style.margin = ' 0px 30px';
        Texto.onclick = function tata() {
            window.location.replace('./Usuarios');
        };
        document.getElementById("Encabezado").appendChild(Texto);
    }
    asd() {
        paginascomponent: Paginas_component_1.Paginascomponent;
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
