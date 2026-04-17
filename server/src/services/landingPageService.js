import LandingBlock from '../models/LandingBlock.js';
import LandingPage from '../models/LandingPage.js';
import Product from '../models/Product.js';
import AffiliateLink from '../models/AffiliateLink.js';

export const upsertLandingPage = async (creatorId, payload) => {
  const landingPage = await LandingPage.findOneAndUpdate(
    { creator: creatorId },
    {
      title: payload.title,
      slug: payload.slug,
      metaTitle: payload.metaTitle,
      metaDescription: payload.metaDescription,
      shareImage: payload.shareImage,
      themePreset: payload.themePreset,
      isPublished: payload.isPublished,
      pages: payload.pages,
      selectedPageId: payload.selectedPageId,
      cta: payload.cta
    },
    { new: true, upsert: true }
  );

  if (Array.isArray(payload.blocks)) {
    await LandingBlock.deleteMany({ landingPage: landingPage._id });
    const blocks = await LandingBlock.insertMany(
      payload.blocks.map((block, index) => ({
        landingPage: landingPage._id,
        ...block,
        order: index
      }))
    );
    landingPage.blocks = blocks.map(block => block._id);
    await landingPage.save();
  }

  return LandingPage.findById(landingPage._id).populate('blocks');
};

export const getPublicLandingPage = async slug => {
  const landingPage = await LandingPage.findOne({ slug, isPublished: true }).populate('blocks');
  if (!landingPage) {
    return null;
  }

  const [products, affiliateLinks] = await Promise.all([
    Product.find({ creator: landingPage.creator, publishedState: 'published' }).limit(4),
    AffiliateLink.find({ creator: landingPage.creator }).limit(6)
  ]);

  return {
    landingPage,
    featuredProducts: products,
    affiliateLinks
  };
};
