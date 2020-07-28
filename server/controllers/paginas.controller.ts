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
    const {title,intro,ussename,usserid,like1,like2,like3,cont,Texto,datacreate,views,like,idCreador,Creador,com} = req.body;
    const newpagina = { title,intro,ussename,like1,like2,like3,cont,usserid,Texto,datacreate,views,like,idCreador,Creador,com,imgUrl:req.file.path};
    const pagina = new Pagina(newpagina);
    await pagina.save();
    return res.json({
        message: 'pagina Saved Successfully',
        pagina
    });
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
    const {title,intro,ussename,usserid,like1,like2,like3,cont,Texto,datacreate,views,like,idCreador,Creador,com} = req.body;
    const updatedPagina = await Pagina.findByIdAndUpdate(id,  { title,intro,ussename,like1,like2,like3,cont,usserid,Texto,datacreate,views,like,idCreador,Creador,com});
    return res.json({message: 'Successfully updated'})

}