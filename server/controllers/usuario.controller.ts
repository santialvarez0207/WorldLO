import { Request, Response } from 'express' //req y res
import path from 'path'

// Models
import User, { Iusuario } from '../models/usuario'; //modelo como antes mencionamos utilizado en el resto de backend

export async function getUsers(req: Request, res: Response): Promise<Response> {
    const user = await User.find(); //tomma todos los users
    return res.json(user); // envia ^ en forma js
};

export async function createUser(req: Request, res: Response): Promise<Response> {
    const {name,mail,password,tipeuser,like1,like2,like3,Lre,NomLL,LLreid,G,config,msg } = req.body; //se ingresan los diferentes datos del cuerpo del js
    const newuser = {name,mail,password,tipeuser,like1,like2,like3,Lre,NomLL,LLreid,G,config,msg}; // se crea una constante con los datos
    const user = new User(newuser); // se adapta al modelo de mongo y se envia a este
    await user.save(); // devuelve una respuesta con todo lo enviado
    return res.json({
        user
    });
};

export async function getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; //toma la id
    const user = await User.findById(id); // busca por id
    return res.json(user);  //respuesta de lo encontrado
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;//toma la id
    const user = await User.findByIdAndRemove(id) as Iusuario; // busca por id y lo elimina
    return res.json({ message: 'Eliminado' });
};

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {name,password,mail,tipeuser,like1,like2,like3 } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {name,password,mail,tipeuser,like1,like2,like3});
    return res.json({
        message: 'Successfully updated',
    });
}