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
const usuario_1 = require("src/app/Models/usuario");
let UsuariosComponent = class UsuariosComponent {
    constructor(UsuarioService, router) {
        this.UsuarioService = UsuarioService;
        this.router = router;
    }
    ngOnInit() {
        this.getUsuario();
    }
    adduser(form) {
        if (form.value._id) {
            this.UsuarioService.putusuarios(form.value).subscribe(res => {
                form.reset();
                M.toast({ html: 'update Successfuly' });
                this.getUsuario();
            });
        }
        else {
            this.verificacion(form);
            console.log(this.state);
            if (this.state == false) {
                form.value.tipeuser = '0';
                console.log("ingreso");
                this.UsuarioService.postusuarios(form.value).subscribe(res => {
                    form.reset();
                    M.toast({ html: 'Register Successfuly, now logget' });
                    this.getUsuario();
                });
            }
        }
    }
    getUsuario() {
        this.UsuarioService.getusuarios().subscribe(res => {
            this.UsuarioService.usuario = res;
            console.log(res);
        });
    }
    resetform(form) {
        if (form) {
            form.reset();
            this.UsuarioService.selectedUsuario = new usuario_1.Usuario();
        }
    }
    edituser(usuario) {
        this.UsuarioService.selectedUsuario = usuario;
    }
    deleteuser(_id, form) {
        if (confirm('Are you sure you want to delete it?')) {
            this.UsuarioService.deleteusuarios(form.value._id)
                .subscribe(res => {
                this.resetform(form);
                M.toast({ html: 'Deleted Succesfully' });
                this.getUsuario();
            });
        }
    }
    loginuser(form) {
        console.log("Prueba exitosa");
        this.UsuarioService.getusuarios().subscribe(res => {
            this.UsuarioService.usuario = res;
            var h;
            h = this.UsuarioService.usuario.length;
            for (var i = 0; i <= h - 1; i++) {
                if (form.value.maillogin == res[i].mail) {
                    if (form.value.passwordlogin == res[i].password) {
                        this.state = true;
                        localStorage.setItem("id", res[i]._id);
                        localStorage.setItem("name", res[i].name);
                        localStorage.setItem("Correo", res[i].mail);
                        this.true();
                    }
                    else {
                        M.toast({ html: 'password incorrect' });
                    }
                }
            }
        });
    }
    true() {
        window.location.reload();
        M.toast({ html: 'Login Succesfully , now explorer :D' });
    }
    verificacion(form) {
        this.UsuarioService.getusuarios().subscribe(res => {
            this.state = false;
            this.UsuarioService.usuario = res;
            var h;
            h = this.UsuarioService.usuario.length;
            for (var i = 0; i <= h - 1; i++) {
                if (form.value.mail == res[i].mail) {
                    if (form.value.name == res[i].name) {
                        M.toast({ html: 'User name in used' });
                        this.state = true;
                    }
                    else {
                        M.toast({ html: 'email in used' });
                        this.state = true;
                    }
                }
            }
            if (form.value.name.length > 20 || form.value.name.length < 12) {
                M.toast({ html: 'name:  max 20 and min 12' });
                this.state = true;
            }
            console.log(form.value.mail.indexOf('@'));
            if (form.value.mail.indexOf('@') < 0 || form.value.mail.indexOf('.com') < 0) {
                M.toast({ html: 'Email not validate' });
                this.state = true;
            }
            return this.state;
        });
    }
};
UsuariosComponent = __decorate([
    core_1.Component({
        selector: 'app-usuarios',
        templateUrl: './usuarios.component.html',
        styleUrls: ['./usuarios.component.css'],
        providers: [usuario_service_1.UsuarioService]
    })
], UsuariosComponent);
exports.UsuariosComponent = UsuariosComponent;
