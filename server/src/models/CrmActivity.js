import mongoose from 'mongoose';

const crmActivitySchema = new mongoose.Schema(
  {
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'CrmLead', required: true, index: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true },
    type: { type: String, enum: ['note', 'status-change', 'dm', 'email', 'conversion', 'tag'], required: true },
    message: { type: String, required: true },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('CrmActivity', crmActivitySchema);

