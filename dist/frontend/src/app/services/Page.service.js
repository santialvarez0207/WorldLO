"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Page_1 = require("../Models/Page");
let PageService = class PageService {
    constructor(http) {
        this.http = http;
        this.URL_API = 'http://localhost:3000/api/Paginas';
        this.selectedPage = new Page_1.Page();
    }
    getPaginas() {
        return this.http.get(this.URL_API);
    }
    postPagina(page) {
        return this.http.post(this.URL_API, page);
    }
    putPagina(page) {
        return this.http.put(this.URL_API + `/${page._id}`, page);
    }
    deletePagina(_id) {
        return this.http.delete(this.URL_API + `/${_id}`);
    }
};
PageService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], PageService);
exports.PageService = PageService;
