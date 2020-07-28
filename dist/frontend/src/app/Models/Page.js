"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Page {
    constructor(_id = '', title = '', intro = '', usserid = '', ussename = '', like1 = 0, like2 = 0, like3 = 0, cont = '') {
        this._id = _id;
        this.title = title;
        this.intro = intro;
        this.usserid = usserid;
        this.ussename = ussename;
        this.like1 = like1;
        this.like2 = like2;
        this.like3 = like3;
        this.cont = cont;
    }
}
exports.Page = Page;
