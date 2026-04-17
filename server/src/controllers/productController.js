import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { listProducts } from '../services/productService.js';
import ApiError from '../utils/apiError.js';

export const listProductsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const data = await listProducts(creator._id, req.query);
  res.json({ success: true, ...data });
});

export const createProductController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await Product.create({ creator: creator._id, ...req.validated.body });
  res.status(201).json({ success: true, item });
});

export const updateProductController = asyncHandler(async (req, res) => {
  const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, item });
});

export const getProductController = asyncHandler(async (req, res) => {
  const item = await Product.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Product not found');
  }
  res.json({ success: true, item });
});

export const getPublicProductBySlugController = asyncHandler(async (req, res) => {
  const item = await Product.findOne({ slug: req.params.slug, publishedState: 'published' });
  if (!item) {
    throw new ApiError(404, 'Product not found');
  }
  res.json({ success: true, item });
});
