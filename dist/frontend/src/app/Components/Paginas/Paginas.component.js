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
let Paginascomponent = class Paginascomponent {
    constructor(pageService, router) {
        this.pageService = pageService;
        this.router = router;
    }
    ngOnInit() {
        this.getPaginas();
        this.Title();
        this.Intro();
        this.Contenido();
    }
    construir() {
    }
    getPaginas() {
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            console.log(res);
        });
    }
    Title() {
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            let Texto = document.createElement('h1', { is: 'a' });
            var otracosa = res[0].title;
            Texto.style.marginTop = "70px";
            Texto.textContent = otracosa;
            document.getElementById("sector").appendChild(Texto);
        });
    }
    Intro() {
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            let Texto = document.createElement('p', { is: 'a' });
            var otracosa = res[0].intro;
            Texto.textContent = otracosa;
            Texto.style.marginLeft = "1%";
            Texto.style.display = "inline-block";
            Texto.style.width = "30%";
            Texto.style.wordWrap = "break-word";
            Texto.style.marginRight = "20%";
            document.getElementById("sector").appendChild(Texto);
        });
    }
    Contenido() {
        this.pageService.getPaginas().subscribe(res => {
            this.pageService.page = res;
            let Texto = document.createElement('p', { is: 'a' });
            var otracosa = res[0].cont;
            Texto.textContent = otracosa;
            Texto.style.marginLeft = "1%";
            Texto.style.display = "inline-block";
            Texto.style.width = "78%";
            Texto.style.wordWrap = "break-word";
            Texto.style.marginRight = "20%";
            document.getElementById("sector").appendChild(Texto);
        });
    }
};
Paginascomponent = __decorate([
    core_1.Component({
        selector: 'app-Paginas',
        templateUrl: './Paginas.component.html',
        styleUrls: ['./Paginas.component.css'],
        providers: [Page_service_1.PageService]
    })
], Paginascomponent);
exports.Paginascomponent = Paginascomponent;
