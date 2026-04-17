import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listUsersController = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash -refreshToken').sort({ createdAt: -1 });
  res.json({ success: true, items: users });
});

