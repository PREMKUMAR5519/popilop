import ScheduledPost from '../models/ScheduledPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { createScheduledPost, publishScheduledPost } from '../services/schedulerService.js';

export const listScheduledPostsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const items = await ScheduledPost.find({ creator: creator._id }).sort({ scheduledFor: 1 }).populate('mediaAssets');
  res.json({ success: true, items });
});

export const createScheduledPostController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await createScheduledPost(creator._id, req.validated.body);
  res.status(201).json({ success: true, item });
});

export const updateScheduledPostController = asyncHandler(async (req, res) => {
  const item = await ScheduledPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, item });
});

export const duplicateScheduledPostController = asyncHandler(async (req, res) => {
  const item = await ScheduledPost.findById(req.params.id).lean();
  delete item._id;
  item.status = 'draft';
  item.title = `${item.title} Copy`;
  const duplicate = await ScheduledPost.create(item);
  res.status(201).json({ success: true, item: duplicate });
});

export const publishNowController = asyncHandler(async (req, res) => {
  const post = await ScheduledPost.findById(req.params.id);
  const item = await publishScheduledPost(post);
  res.json({ success: true, item });
});

