import mongoose from 'mongoose';

const automationLogSchema = new mongoose.Schema(
  {
    automation: { type: mongoose.Schema.Types.ObjectId, ref: 'Automation', required: true, index: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'CrmLead' },
    triggerPayload: mongoose.Schema.Types.Mixed,
    sendStatus: { type: String, enum: ['queued', 'sent', 'skipped', 'failed'], default: 'queued' },
    responseMessage: String,
    sentAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('AutomationLog', automationLogSchema);

