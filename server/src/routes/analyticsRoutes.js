import { Router } from 'express';
import { getDashboardAnalyticsController, trackAnalyticsEventController } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireAuth, getDashboardAnalyticsController);
router.post('/events', trackAnalyticsEventController);

export default router;

