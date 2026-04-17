import Product from '../models/Product.js';
import { buildPaginatedResponse, buildPagination } from '../utils/query.js';

export const listProducts = async (creatorId, query) => {
  const { page, limit, skip } = buildPagination(query);
  const filters = { creator: creatorId };

  if (query.state) {
    filters.publishedState = query.state;
  }

  const [items, total] = await Promise.all([
    Product.find(filters).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filters)
  ]);

  return buildPaginatedResponse({ items, total, page, limit });
};

