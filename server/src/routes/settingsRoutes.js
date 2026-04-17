import { Router } from 'express';
import {
  getSettingsController,
  listMediaLibraryController,
  updateSettingsController
} from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, getSettingsController);
router.patch('/', requireAuth, updateSettingsController);
router.get('/media-library', requireAuth, listMediaLibraryController);

export default router;

