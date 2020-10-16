
const User_Note = require('../models/UserNote')
import { Request, Response } from 'express' 
import path from 'path'



export async function createUserNote (req: Request, res: Response): Promise<Response> {  
    
    const user_Note = new User_Note(req.body);
    console.log(req.body)
    await user_Note.save()
    return res.json({
        'status': 'saved'
    });

};

export async function GetUserNote (req: Request, res: Response): Promise<Response> {
    const user_Note = await User_Note.findById(req.params.id);

    return res.json(user_Note);
};

export async function UpdateUserNote (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const actualizado={
        _id: req.body._id, 
        notes: req.body.notes
    }
    await User_Note.findByIdAndUpdate(id, {$set: actualizado});

    return res.json({
        'status': 'update'
    });

};