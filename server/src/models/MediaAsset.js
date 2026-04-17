import mongoose from 'mongoose';

const mediaAssetSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'document', 'archive'], default: 'image' },
    mimeType: String,
    size: Number,
    folder: String,
    provider: { type: String, default: 'cloudflare-r2' },
    url: String,
    key: String,
    altText: String
  },
  { timestamps: true }
);

export default mongoose.model('MediaAsset', mediaAssetSchema);

