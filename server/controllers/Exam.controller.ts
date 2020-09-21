import { Request, Response } from 'express'
import path from 'path'

// Models
import Exam, { IExam } from '../models/exam';

export async function getExams(req: Request, res: Response): Promise<Response> {
    const exam = await Exam.find();
    return res.json(exam);
};

export async function createExam(req: Request, res: Response): Promise<Response> {
    const {title,intro,usserid,ussename,configuracion,questionid,respondidas,imagen,orden} = req.body;
    const newexam = {title,intro,usserid,ussename,configuracion,questionid,respondidas,imagen,orden};
    const exam = new Exam(newexam);
    await exam.save();
    return res.json(exam);
};

export async function getExam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    return res.json(exam);
}

export async function deleteExam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const exam = await Exam.findByIdAndRemove(id) as IExam;
    return res.json(exam);
};

export async function updateExam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {title,intro,usserid,ussename,configuracion,questionid,respondidas,imagen,orden} = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(id, {title,intro,usserid,ussename,configuracion,questionid,respondidas,imagen,orden});
    return res.json(updatedExam);
}