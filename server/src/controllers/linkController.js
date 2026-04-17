import SocialLink from '../models/SocialLink.js';
import AffiliateLink from '../models/AffiliateLink.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';

export const listLinksController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const [socialLinks, affiliateLinks] = await Promise.all([
    SocialLink.find({ creator: creator._id }).sort({ order: 1 }),
    AffiliateLink.find({ creator: creator._id }).sort({ createdAt: -1 })
  ]);

  res.json({ success: true, item: { socialLinks, affiliateLinks } });
});

export const createSocialLinkController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await SocialLink.create({ creator: creator._id, ...req.body });
  res.status(201).json({ success: true, item });
});

export const createAffiliateLinkController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await AffiliateLink.create({ creator: creator._id, ...req.body });
  res.status(201).json({ success: true, item });
});

export const trackAffiliateRedirectController = asyncHandler(async (req, res) => {
  const item = await AffiliateLink.findById(req.params.id);
  if (item) {
    item.clicks += 1;
    await item.save();
  }
  res.json({ success: true, redirectUrl: item?.url });
});

