import mongoose from 'mongoose';

const instagramConnectionSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, unique: true },
    provider: { type: String, default: 'meta-instagram' },
    accountId: String,
    username: String,
    accessToken: String,
    refreshToken: String,
    scopes: [String],
    status: { type: String, enum: ['connected', 'expired', 'pending', 'error'], default: 'pending' },
    lastSyncedAt: Date,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('InstagramConnection', instagramConnectionSchema);

