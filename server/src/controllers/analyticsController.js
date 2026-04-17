import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { getDashboardAnalytics, trackEvent } from '../services/analyticsService.js';

export const getDashboardAnalyticsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await getDashboardAnalytics(creator._id);
  res.json({ success: true, item });
});

export const trackAnalyticsEventController = asyncHandler(async (req, res) => {
  const item = await trackEvent(req.body);
  res.status(201).json({ success: true, item });
});

