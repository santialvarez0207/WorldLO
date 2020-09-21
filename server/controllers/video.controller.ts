import { Request, Response } from 'express'
import path from 'path'

// Models
import Video, { IVideo } from '../models/Debate';

export async function getVideos(req: Request, res: Response): Promise<Response> {
    const video = await Video.find();
    return res.json(video);
};

export async function createVideo(req: Request, res: Response): Promise<Response> {
    const {name,password,idcreador} = req.body;
    const newvideo = {name,password,idcreador};
    const video = new Video(newvideo);
    await video.save();
    return res.json(video);
};

export async function getVideo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.json(video);
}

export async function deleteVideo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const video = await Video.findByIdAndRemove(id) as IVideo;
    return res.json({ message: 'video Deleted' });
};

export async function updateVideo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {name,password,idcreador} = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(id, {name,password,idcreador});
    return res.json({
        updatedVideo
    
    });
}