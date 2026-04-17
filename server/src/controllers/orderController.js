import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { createCheckoutSession } from '../integrations/payments/mockPaymentService.js';
import ApiError from '../utils/apiError.js';

export const listOrdersController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const items = await Order.find({ creator: creator._id }).populate('product').sort({ createdAt: -1 });
  res.json({ success: true, items });
});

export const createCheckoutController = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  const session = await createCheckoutSession({
    product,
    customer: {
      name: req.body.customerName,
      email: req.body.customerEmail
    }
  });

  const item = await Order.create({
    creator: product.creator,
    product: product._id,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    amount: product.price,
    status: 'pending',
    metadata: { session }
  });

  res.status(201).json({ success: true, item, session });
});
