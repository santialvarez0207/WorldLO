"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(_id = '', name = '', password = '', mail = '', tipeuser = '') {
        this._id = _id;
        this.name = name;
        this.password = password;
        this.mail = mail;
        this.tipeuser = tipeuser;
    }
}
exports.Usuario = Usuario;
