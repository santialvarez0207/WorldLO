"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const Page_service_1 = require("./Page.service");
describe('PageService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(Page_service_1.PageService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
