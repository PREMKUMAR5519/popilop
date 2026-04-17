import { Router } from 'express';
import {
  getMyLandingPageController,
  getPublicLandingPageController,
  upsertLandingPageController
} from '../controllers/landingPageController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { landingPageSchema } from '../validations/landingValidation.js';

const router = Router();

router.get('/me', requireAuth, getMyLandingPageController);
router.put('/me', requireAuth, validateRequest(landingPageSchema), upsertLandingPageController);
router.get('/public/:slug', getPublicLandingPageController);

export default router;

