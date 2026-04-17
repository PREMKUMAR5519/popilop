import { Router } from 'express';
import {
  createAffiliateLinkController,
  createSocialLinkController,
  listLinksController,
  trackAffiliateRedirectController
} from '../controllers/linkController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listLinksController);
router.post('/social', requireAuth, createSocialLinkController);
router.post('/affiliate', requireAuth, createAffiliateLinkController);
router.get('/affiliate/:id/redirect', trackAffiliateRedirectController);

export default router;

