import mongoose from 'mongoose';

const scheduledPostSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    title: { type: String, required: true },
    caption: String,
    postType: { type: String, enum: ['image', 'carousel', 'reel', 'story'], default: 'image' },
    mediaAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' }],
    scheduledFor: { type: Date, required: true, index: true },
    status: { type: String, enum: ['draft', 'scheduled', 'published', 'failed'], default: 'draft', index: true },
    provider: { type: String, default: 'instagram' },
    publishResult: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('ScheduledPost', scheduledPostSchema);

