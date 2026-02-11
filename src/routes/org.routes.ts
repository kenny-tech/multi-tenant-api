import { Router } from 'express';
import { createOrg, getOrg } from '../controllers/org.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createOrg);
router.get('/:id', authenticate, getOrg);

export default router;
