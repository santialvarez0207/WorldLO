"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Page_service_1 = require("../../services/Page.service");
let HomeComponent = class HomeComponent {
    constructor(pageService, router) {
        this.pageService = pageService;
        this.router = router;
    }
    getPaginas() {
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            console.log(res);
        });
    }
    Prueba1() {
        console.log("Prueba exitosa");
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            this.h = this.pageService.page.length;
            console.log(this.h);
            console.log(this.i);
            if (this.i + 5 <= this.h) {
                for (this.i; this.i <= this.i + 5; this.i++) {
                    var a = res[this.i].intro;
                    this.Imagen();
                    this.Texto(a);
                }
            }
            else {
                this.Imagen();
                this.Texto("No se encontraron mas resultados");
            }
        });
    }
    ngOnInit() {
        this.i = 0;
        this.Prueba1();
    }
    Texto(a) {
        let Texto = document.createElement('p', { is: 'a' });
        Texto.textContent = a;
        Texto.style.marginLeft = "1%";
        Texto.style.display = "inline-block";
        Texto.style.width = "30%";
        Texto.style.wordWrap = "break-word";
        Texto.style.marginRight = "20%";
        document.getElementById("Homegenerator").appendChild(Texto);
    }
    Imagen() {
        let Imagen = document.createElement('canvas', { is: 'a' });
        Imagen.style.marginLeft = "2%";
        Imagen.style.background = "#ff5733";
        Imagen.style.width = "30%";
        Imagen.style.left = "10%";
        document.getElementById("Homegenerator").appendChild(Imagen);
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-Home',
        templateUrl: './Home.component.html',
        styleUrls: ['./Home.component.css'],
        providers: [Page_service_1.PageService]
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
