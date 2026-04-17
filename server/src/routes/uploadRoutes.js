import { Router } from 'express';
import { upload, uploadAssetController } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, upload.single('file'), uploadAssetController);

export default router;

