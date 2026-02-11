import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.create(req.user.orgId, req.body.name, req.body.description);
    res.status(201).json({ success: true, message: 'Project created', data: project });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.list(req.user.orgId);
    res.json({ success: true, message: 'Projects fetched', data: projects });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await ProjectService.delete(req.user.orgId, req.params.id);
    res.json({ success: true, message: 'Project deleted', data: null });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};
