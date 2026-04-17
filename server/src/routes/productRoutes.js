import { Router } from 'express';
import {
  createProductController,
  getProductController,
  getPublicProductBySlugController,
  listProductsController,
  updateProductController
} from '../controllers/productController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { productSchema } from '../validations/productValidation.js';

const router = Router();

router.get('/', requireAuth, listProductsController);
router.post('/', requireAuth, validateRequest(productSchema), createProductController);
router.get('/public/:slug', getPublicProductBySlugController);
router.get('/:id', requireAuth, getProductController);
router.patch('/:id', requireAuth, updateProductController);

export default router;

