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
const Page_1 = require("src/app/Models/Page");
let Creacioncomponent = class Creacioncomponent {
    constructor(PageService, router) {
        this.PageService = PageService;
        this.router = router;
        this.state = true;
    }
    ngOnInit() {
    }
    addpages(form) {
        if (this.state == false) {
            form.value.tipeuser = '0';
            console.log("ingreso");
            form.value.usserid = localStorage.getItem("id");
            form.value.ussename = localStorage.getItem("name");
            this.PageService.postPagina(form.value).subscribe(res => {
                M.toast({ html: 'Register Successfuly, now logget' });
            });
        }
    }
    getpages() {
        this.PageService.getPaginas().subscribe(res => {
            this.PageService.page = res;
            console.log(res);
        });
    }
    resetform(form) {
        if (form) {
            form.reset();
            this.PageService.selectedPage = new Page_1.Page();
        }
    }
    edituser(page) {
        this.PageService.selectedPage = page;
    }
    deleteuser(_id, form) {
        if (confirm('Are you sure you want to delete it?')) {
            this.PageService.deletePagina(form.value._id)
                .subscribe(res => {
                this.resetform(form);
                M.toast({ html: 'Deleted Succesfully' });
                this.getpages();
            });
        }
    }
    imagen() {
        let Texto = document.createElement('p', { is: 'a' });
        var otracosa = 'Esto es temporal';
        Texto.textContent = otracosa;
        Texto.style.marginLeft = "1%";
        Texto.style.display = "inline-block";
        Texto.style.width = "30%";
        Texto.style.wordWrap = "break-word";
        Texto.style.marginRight = "20%";
        document.getElementById("sector").appendChild(Texto);
    }
    texto() {
        let Texto = document.createElement('textarea', { is: 'a' });
        Texto.style.marginLeft = "1.5%";
        Texto.style.marginTop = "12px";
        Texto.style.display = "inline-block";
        Texto.style.width = "97%";
        Texto.style.wordWrap = "break-word";
        document.getElementById("sector").appendChild(Texto);
    }
    verificacion(form) {
        this.state = false;
        this.PageService.getPaginas().subscribe(res => {
            this.state = false;
            if (form.value.intro.length > 700) {
                M.toast({ html: 'intro:  max 700' });
                this.state = true;
            }
            if (this.state == false) {
                this.addpages(form);
            }
        });
    }
};
Creacioncomponent = __decorate([
    core_1.Component({
        selector: 'app-Creacion',
        templateUrl: './Creacion.component.html',
        styleUrls: ['./Creacion.component.css'],
        providers: [Page_service_1.PageService]
    })
], Creacioncomponent);
exports.Creacioncomponent = Creacioncomponent;
