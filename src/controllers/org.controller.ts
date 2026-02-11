import { Request, Response } from 'express';
import { OrgService } from '../services/org.service';

export const createOrg = async (req: Request, res: Response) => {
  try {
    const org = await OrgService.create(req.body.name);
    res.status(201).json({ success: true, message: 'Organization created', data: org });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};

export const getOrg = async (req: Request, res: Response) => {
  try {
    const org = await OrgService.getById(req.params.id);
    if (!org) throw new Error('Organization not found');
    res.json({ success: true, message: 'Organization fetched', data: org });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message, data: null });
  }
};
