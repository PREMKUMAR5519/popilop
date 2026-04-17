import { Router } from 'express';
import {
  addLeadNoteController,
  createLeadController,
  getLeadController,
  listLeadsController,
  updateLeadController
} from '../controllers/crmController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listLeadsController);
router.post('/', requireAuth, createLeadController);
router.get('/:id', requireAuth, getLeadController);
router.patch('/:id', requireAuth, updateLeadController);
router.post('/:id/notes', requireAuth, addLeadNoteController);

export default router;

