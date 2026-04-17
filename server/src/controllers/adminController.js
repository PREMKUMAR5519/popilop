import User from '../models/User.js';
import CreatorProfile from '../models/CreatorProfile.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAdminOverviewController = asyncHandler(async (req, res) => {
  const [users, creators, products, revenue] = await Promise.all([
    User.countDocuments(),
    CreatorProfile.countDocuments(),
    Product.countDocuments(),
    Order.aggregate([
      { $match: { status: { $in: ['paid', 'fulfilled'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
  ]);

  res.json({
    success: true,
    item: {
      users,
      creators,
      products,
      revenue: revenue[0]?.total || 0
    }
  });
});

export const listAdminUsersController = asyncHandler(async (req, res) => {
  const items = await User.find().select('-passwordHash -refreshToken').sort({ createdAt: -1 });
  res.json({ success: true, items });
});

export const getAdminCreatorDetailController = asyncHandler(async (req, res) => {
  const creator = await CreatorProfile.findById(req.params.id).populate('user');
  const products = await Product.find({ creator: creator._id });
  res.json({ success: true, item: { creator, products } });
});
