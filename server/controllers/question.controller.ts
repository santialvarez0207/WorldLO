import { Request, Response } from 'express'
import path from 'path'

// Models
import Question, { IQuestion } from '../models/question';

export async function getQuestions(req: Request, res: Response): Promise<Response> {
    const question = await Question.find();
    return res.json(question);
};

export async function createQuestion(req: Request, res: Response): Promise<Response> {
    const {text,resp,Cres,tipe,Uid} = req.body;
    const newquestion = {text,resp,Cres,tipe,Uid};
    const question = new Question(newquestion);
    await question.save();
    return res.json(question);
};

export async function getQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const question = await Question.findById(id);
    return res.json(question);
}

export async function deleteQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const question = await Question.findByIdAndRemove(id) as IQuestion;
    return res.json({ message: 'question Deleted' });
};

export async function updateQuestion(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {text,resp,cres,tipe,Uid} = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, {text,resp,cres,tipe,Uid});
    return res.json({
        updatedQuestion
    
    });
}