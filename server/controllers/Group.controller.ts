import { Request, Response } from 'express'
import path from 'path'

// Models
import Group, { IGroup } from '../models/Group';

export async function getGroups(req: Request, res: Response): Promise<Response> {
    const group = await Group.find();
    return res.json(group);
};

export async function createGroup(req: Request, res: Response): Promise<Response> {
    const {Name,Description,usserid,ussename,Admins,Users,publicgroup} = req.body;
    const newgroup = {Name,Description,usserid,ussename,Admins,Users,publicgroup,imgUrl:req.file.path};
    const group = new Group(newgroup);
    await group.save();
    return res.json({group});
};

export async function getGroup(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const group = await Group.findById(id);
    return res.json(group);
}

export async function deleteGroup(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const group = await Group.findByIdAndRemove(id) as IGroup;
    return res.json({ message: 'group Deleted' });
};

export async function updateGroup(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {Name,Description,usserid,ussename,Admins,Users,publicgroup} = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(id, {Name,Description,usserid,ussename,Admins,Users,publicgroup});
    return res.json({
        updatedGroup
    });
}