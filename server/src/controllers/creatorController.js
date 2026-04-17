import CreatorProfile from '../models/CreatorProfile.js';
import LandingPage from '../models/LandingPage.js';
import Product from '../models/Product.js';
import SocialLink from '../models/SocialLink.js';
import AffiliateLink from '../models/AffiliateLink.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';

export const getMyCreatorProfileController = asyncHandler(async (req, res) => {
  const profile = await CreatorProfile.findOne({ user: req.user._id }).populate('featuredProductIds');
  res.json({ success: true, item: profile });
});

export const updateMyCreatorProfileController = asyncHandler(async (req, res) => {
  const profile = await CreatorProfile.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
  res.json({ success: true, item: profile });
});

export const getPublicCreatorController = asyncHandler(async (req, res) => {
  const profile = await CreatorProfile.findOne({ slug: req.params.slug });
  if (!profile) {
    throw new ApiError(404, 'Creator not found');
  }
  const landingPage = await LandingPage.findOne({ creator: profile._id }).populate('blocks');
  const [products, links, affiliateLinks] = await Promise.all([
    Product.find({ creator: profile?._id, publishedState: 'published' }).limit(6),
    SocialLink.find({ creator: profile?._id, isVisible: true }).sort({ order: 1 }),
    AffiliateLink.find({ creator: profile?._id }).limit(6)
  ]);

  res.json({
    success: true,
    item: {
      profile,
      landingPage,
      products,
      links,
      affiliateLinks
    }
  });
});
