import { Router } from 'express';
import { createCheckoutController, listOrdersController } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listOrdersController);
router.post('/checkout', createCheckoutController);

export default router;

