import mongoose from 'mongoose';

const creatorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    displayName: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    headline: String,
    bio: String,
    category: String,
    location: String,
    avatar: String,
    heroImage: String,
    verified: { type: Boolean, default: false },
    themePreset: { type: String, default: 'aurora' },
    socials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SocialLink' }],
    featuredProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    metrics: {
      monthlyViews: { type: Number, default: 0 },
      monthlyClicks: { type: Number, default: 0 },
      monthlyRevenue: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('CreatorProfile', creatorProfileSchema);

