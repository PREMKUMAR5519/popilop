import { Router } from 'express';
import { connectInstagramController, getInstagramConnectionController } from '../controllers/instagramController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/connection', requireAuth, getInstagramConnectionController);
router.post('/connect', requireAuth, connectInstagramController);

export default router;

