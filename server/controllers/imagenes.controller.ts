import { Request, Response } from 'express' //req y res
import path from 'path'

// Models
import Imagenes, { Iimagenes } from '../models/Imagenes'; //modelo como antes mencionamos utilizado en el resto de backend

export async function getImageness(req: Request, res: Response): Promise<Response> {
    const imagen = await Imagenes.find(); //tomma todos los imagens
    return res.json(imagen); // envia ^ en forma js
};

export async function createImagenes(req: Request, res: Response): Promise<Response> {
    const newimagen = {U:req.file.path}; // se crea una constante con los datos
    const imagen = new Imagenes(newimagen); // se adapta al modelo de mongo y se envia a este
    await imagen.save(); // devuelve una respuesta con todo lo enviado
    return res.json(imagen);
};

export async function getImagenes(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; //toma la id
    const imagen = await Imagenes.findById(id); // busca por id
    return res.json(imagen);  //respuesta de lo encontrado
}

export async function deleteImagenes(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;//toma la id
    const imagen = await Imagenes.findByIdAndRemove(id) as Iimagenes; // busca por id y lo elimina
    return res.json({ message: 'Eliminado' });
};

export async function updateImagenes(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {name,password,mail,tipeimagen,like1,like2,like3 } = req.body;
    const updatedImagenes = await Imagenes.findByIdAndUpdate(id, {name,password,mail,tipeimagen,like1,like2,like3});
    return res.json({
        message: 'Successfully updated',
    });
}