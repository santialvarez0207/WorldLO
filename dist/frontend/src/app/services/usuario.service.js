"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const usuario_1 = require("../Models/usuario");
let UsuarioService = class UsuarioService {
    constructor(http) {
        this.http = http;
        this.URL_API = 'http://localhost:3000/api/Usuario';
        this.selectedUsuario = new usuario_1.Usuario();
    }
    getusuarios() {
        return this.http.get(this.URL_API);
    }
    postusuarios(usuario) {
        return this.http.post(this.URL_API, usuario);
    }
    putusuarios(usuario) {
        return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
    }
    deleteusuarios(_id) {
        return this.http.delete(this.URL_API + `/${_id}`);
    }
};
UsuarioService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], UsuarioService);
exports.UsuarioService = UsuarioService;
