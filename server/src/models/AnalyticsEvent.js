import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    type: {
      type: String,
      enum: ['page-view', 'link-click', 'product-view', 'purchase', 'lead-capture', 'automation-trigger', 'affiliate-click', 'email-signup'],
      required: true,
      index: true
    },
    source: String,
    targetId: String,
    referrer: String,
    sessionId: String,
    metadata: mongoose.Schema.Types.Mixed,
    occurredAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('AnalyticsEvent', analyticsEventSchema);

