import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs-extra'

// Models
import Pagina, { Ipaginas } from '../models/paginas';

export async function getPaginas(req: Request, res: Response): Promise<Response> {
    const pagina = await Pagina.find();
    return res.json(pagina);
};


export async function createPagina(req: Request, res: Response): Promise<Response> {
    const {title,intro,ussename,usserid,like1,like2,like3,cont,Texto,datacreate,likeid,like,idCreador,Creador,com,orden,videos,imgUrlB} = req.body;
    const newpagina = { title,intro,ussename,like1,like2,like3,cont,usserid,Texto,datacreate,likeid,like,idCreador,Creador,orden,videos,imgUrlB,com,imgUrl:req.file.path};
    const pagina = new Pagina(newpagina);
    await pagina.save();
    return res.json(pagina);
    //
};

export async function getPagina(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params;

    const pagina = await Pagina.findById(id);
    return res.json(pagina);
 
}

export async function deletePagina(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await Pagina.findByIdAndRemove(id) as Ipaginas;
    return res.json({ message: 'pagina Deleted' });
};

export async function updatePagina(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {title,intro,ussename,usserid,like1,like2,like3,cont,Texto,datacreate,likeid,like,idCreador,Creador,com,orden,imgUrlB,videos} = req.body;
    const updatedPagina = await Pagina.findByIdAndUpdate(id,  { title,intro,ussename,like1,like2,like3,cont,usserid,Texto,datacreate,likeid,like,idCreador,Creador,imgUrlB,com,orden,videos});
    return res.json({message: 'Successfully updated'})

}