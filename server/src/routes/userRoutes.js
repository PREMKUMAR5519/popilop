import { Router } from 'express';
import { listUsersController } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), listUsersController);

export default router;

