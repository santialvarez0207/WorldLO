import { Request, Response } from "express"; //req y res
import path from "path";

// Models
import Soli, { ISoli } from "../models/solicitudes"; //modelo como antes mencionamos utilizado en el resto de backend

export async function getSolis(req: Request, res: Response): Promise<Response> {
  const soli = await Soli.find(); //tomma todos los solis
  return res.json(soli); // envia ^ en forma js
}

export async function createSoli(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, mail, uid, fechan, fechas, imagenes, dato } = req.body; //se ingresan los diferentes datos del cuerpo del js
  const newsoli = { name, mail, uid, fechan, fechas, imagenes, dato }; // se crea una constante con los datos
  const soli = new Soli(newsoli); // se adapta al modelo de mongo y se envia a este
  await soli.save(); // devuelve una respuesta con todo lo enviado
  return res.json(soli);
}

export async function getSoli(req: Request, res: Response): Promise<Response> {
  const { id } = req.params; //toma la id
  const soli = await Soli.findById(id); // busca por id
  return res.json(soli); //respuesta de lo encontrado
}

export async function clave(req: Request, res: Response): Promise<Response> {
  const { clave } = req.body; //toma la idv
  var x;
  if (clave == "estaesunacontrasenamuysegura") {
    x = "true";
  } //respuesta de lo encontrado}
  else {
    x = "false";
  }
  console.log(clave);
  return res.json(x);
}

export async function deleteSoli(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params; //toma la id
  const soli = (await Soli.findByIdAndRemove(id)) as ISoli; // busca por id y lo elimina
  return res.json({ message: "Eliminado" });
}

export async function updateSoli(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { name, mail, uid, fechan, fechas, imagenes } = req.body;
  const updatedSoli = await Soli.findByIdAndUpdate(id, {
    name,
    mail,
    uid,
    fechan,
    fechas,
    imagenes,
  });
  return res.json(updatedSoli);
}
