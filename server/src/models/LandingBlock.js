import mongoose from 'mongoose';

const landingBlockSchema = new mongoose.Schema(
  {
    landingPage: { type: mongoose.Schema.Types.ObjectId, ref: 'LandingPage', required: true, index: true },
    type: {
      type: String,
      enum: ['hero', 'bio', 'social-links', 'cta', 'featured-products', 'affiliate-links', 'testimonials', 'gallery', 'email-capture', 'faq', 'banner'],
      required: true
    },
    title: String,
    subtitle: String,
    content: mongoose.Schema.Types.Mixed,
    settings: mongoose.Schema.Types.Mixed,
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('LandingBlock', landingBlockSchema);

