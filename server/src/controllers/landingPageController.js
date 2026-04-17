import LandingPage from '../models/LandingPage.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { getPublicLandingPage, upsertLandingPage } from '../services/landingPageService.js';

export const getMyLandingPageController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const landingPage = await LandingPage.findOne({ creator: creator._id }).populate('blocks');
  res.json({ success: true, item: landingPage });
});

export const upsertLandingPageController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const landingPage = await upsertLandingPage(creator._id, req.validated.body);
  res.json({ success: true, item: landingPage });
});

export const getPublicLandingPageController = asyncHandler(async (req, res) => {
  const data = await getPublicLandingPage(req.params.slug);
  res.json({ success: true, item: data });
});

