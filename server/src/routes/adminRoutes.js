import { Router } from 'express';
import {
  getAdminCreatorDetailController,
  getAdminOverviewController,
  listAdminUsersController
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/overview', getAdminOverviewController);
router.get('/users', listAdminUsersController);
router.get('/creators/:id', getAdminCreatorDetailController);

export default router;

