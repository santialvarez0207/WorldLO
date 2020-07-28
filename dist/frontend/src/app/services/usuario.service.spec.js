"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const usuario_service_1 = require("./usuario.service");
describe('UsuarioService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(usuario_service_1.UsuarioService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
