"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const usuario_service_1 = require("../../services/usuario.service");
let PorfileComponent = class PorfileComponent {
    constructor(UsuarioService, router) {
        this.UsuarioService = UsuarioService;
        this.router = router;
        this.state = false;
    }
    ngOnInit() {
        this.Formato();
    }
    adduser(form) {
        form.value._id = localStorage.getItem("id");
        form.value.tipeuser = '0';
        this.UsuarioService.putusuarios(form.value).subscribe(res => {
            M.toast({ html: 'update Successfuly' });
        });
    }
    ;
    Formato() {
        let Texto = document.createElement('h5', { is: 'a' });
        var otracosa = localStorage.getItem("name");
        Texto.textContent = otracosa;
        document.getElementById("lugar").appendChild(Texto);
        Texto = document.createElement('h5', { is: 'a' });
        otracosa = localStorage.getItem("Correo");
        Texto.textContent = otracosa;
        document.getElementById("lugar1").appendChild(Texto);
    }
};
PorfileComponent = __decorate([
    core_1.Component({
        selector: 'app-Porfile',
        templateUrl: './Porfile.component.html',
        styleUrls: ['./Porfile.component.css'],
        providers: [usuario_service_1.UsuarioService]
    })
], PorfileComponent);
exports.PorfileComponent = PorfileComponent;
