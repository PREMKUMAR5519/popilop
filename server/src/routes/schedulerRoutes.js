import { Router } from 'express';
import {
  createScheduledPostController,
  duplicateScheduledPostController,
  listScheduledPostsController,
  publishNowController,
  updateScheduledPostController
} from '../controllers/schedulerController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { scheduledPostSchema } from '../validations/schedulerValidation.js';

const router = Router();

router.get('/', requireAuth, listScheduledPostsController);
router.post('/', requireAuth, validateRequest(scheduledPostSchema), createScheduledPostController);
router.patch('/:id', requireAuth, updateScheduledPostController);
router.post('/:id/duplicate', requireAuth, duplicateScheduledPostController);
router.post('/:id/publish', requireAuth, publishNowController);

export default router;

