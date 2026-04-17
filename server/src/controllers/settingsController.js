import CreatorSetting from '../models/CreatorSetting.js';
import MediaAsset from '../models/MediaAsset.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';

export const getSettingsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await CreatorSetting.findOne({ creator: creator._id });
  res.json({ success: true, item });
});

export const updateSettingsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await CreatorSetting.findOneAndUpdate({ creator: creator._id }, req.body, {
    new: true,
    upsert: true
  });
  res.json({ success: true, item });
});

export const listMediaLibraryController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const items = await MediaAsset.find({ creator: creator._id }).sort({ createdAt: -1 });
  res.json({ success: true, items });
});

