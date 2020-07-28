import { Request, Response } from 'express'
import path from 'path'

// Models
import PublicG, { IPublicG } from '../models/PublicG';

export async function getPublicGs(req: Request, res: Response): Promise<Response> {
    const publicg = await PublicG.find();
    return res.json(publicg);
};

export async function createPublicG(req: Request, res: Response): Promise<Response> {
    const {text,temp,usserid,ussename} = req.body;
    const newpublicg = {text,temp,usserid,ussename,imgUrl:req.file.path};
    const publicg = new PublicG(newpublicg);
    await publicg.save();
    return res.json({publicg});
};

export async function getPublicG(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const publicg = await PublicG.findById(id);
    return res.json(publicg);
}

export async function deletePublicG(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const publicg = await PublicG.findByIdAndRemove(id) as IPublicG;
    return res.json({ message: 'publicacion Deleted' });
};

export async function updatePublicG(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {text,temp,usserid,ussename} = req.body;
    const updatedPublicG = await PublicG.findByIdAndUpdate(id, {text,temp,usserid,ussename});
    return res.json({
        updatedPublicG
 
    });
}