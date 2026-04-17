import mongoose from 'mongoose';

const landingPageSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    metaTitle: String,
    metaDescription: String,
    shareImage: String,
    themePreset: { type: String, default: 'aurora' },
    isPublished: { type: Boolean, default: true },
    blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LandingBlock' }],
    pages: { type: [mongoose.Schema.Types.Mixed], default: [] },
    selectedPageId: String,
    cta: {
      label: String,
      url: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('LandingPage', landingPageSchema);
