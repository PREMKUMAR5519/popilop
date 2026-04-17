import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    platform: { type: String, required: true },
    label: String,
    url: { type: String, required: true },
    icon: String,
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('SocialLink', socialLinkSchema);

