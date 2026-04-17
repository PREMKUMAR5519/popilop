import mongoose from 'mongoose';

const affiliateLinkSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    url: { type: String, required: true },
    description: String,
    category: String,
    clicks: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    commissionLabel: String,
    isPinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

affiliateLinkSchema.index({ creator: 1, slug: 1 }, { unique: true });

export default mongoose.model('AffiliateLink', affiliateLinkSchema);

