import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    name: { type: String, required: true },
    triggerSource: { type: String, default: 'instagram-comments' },
    targetContentId: String,
    matchMode: { type: String, enum: ['exact', 'contains', 'any'], default: 'contains' },
    keywords: [String],
    messageTemplate: { type: String, required: true },
    followUpMessage: String,
    followUpDelayMinutes: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    rateLimitPerHour: { type: Number, default: 15 },
    createLead: { type: Boolean, default: true },
    tagLeadWith: [String],
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('Automation', automationSchema);

