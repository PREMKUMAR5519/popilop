import mongoose from 'mongoose';

const crmLeadSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    name: String,
    instagramHandle: { type: String, index: true },
    profileUrl: String,
    email: String,
    tags: [String],
    source: { type: String, default: 'instagram' },
    dmStatus: { type: String, enum: ['none', 'queued', 'sent', 'replied', 'failed'], default: 'none' },
    status: { type: String, enum: ['new', 'warm', 'converted', 'closed'], default: 'new', index: true },
    lastInteraction: Date,
    notes: String,
    campaignAttribution: String,
    commentTriggerSource: String,
    followUpAt: Date,
    convertedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('CrmLead', crmLeadSchema);

