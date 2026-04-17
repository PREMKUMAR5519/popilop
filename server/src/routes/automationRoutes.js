import { Router } from 'express';
import {
  createAutomationController,
  listAutomationsController,
  runAutomationTestController,
  updateAutomationController
} from '../controllers/automationController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { automationSchema } from '../validations/automationValidation.js';

const router = Router();

router.get('/', requireAuth, listAutomationsController);
router.post('/', requireAuth, validateRequest(automationSchema), createAutomationController);
router.patch('/:id', requireAuth, updateAutomationController);
router.post('/:id/test', requireAuth, runAutomationTestController);

export default router;

