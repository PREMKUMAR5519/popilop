import mongoose from 'mongoose';

const creatorSettingSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, unique: true },
    timezone: { type: String, default: 'UTC' },
    locale: { type: String, default: 'en' },
    brandColor: { type: String, default: '#ff6b57' },
    emailMarketingOptIn: { type: Boolean, default: true },
    notificationPreferences: mongoose.Schema.Types.Mixed,
    billing: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('CreatorSetting', creatorSettingSchema);
