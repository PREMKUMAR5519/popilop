import { Router } from 'express';
import {
  getMyCreatorProfileController,
  getPublicCreatorController,
  updateMyCreatorProfileController
} from '../controllers/creatorController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getMyCreatorProfileController);
router.patch('/me', requireAuth, updateMyCreatorProfileController);
router.get('/:slug/public', getPublicCreatorController);

export default router;

