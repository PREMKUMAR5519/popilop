import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: String,
    duration: String,
    summary: String
  },
  { _id: false }
);

const moduleSchema = new mongoose.Schema(
  {
    title: String,
    lessons: [lessonSchema]
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    category: String,
    price: { type: Number, default: 0 },
    compareAtPrice: Number,
    thumbnail: String,
    gallery: [String],
    deliveryType: { type: String, enum: ['download', 'external-link', 'course', 'physical'], default: 'download' },
    inventory: { type: Number, default: 9999 },
    affiliateUrl: String,
    downloadableAssets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' }],
    publishedState: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    tags: [String],
    featured: { type: Boolean, default: false },
    courseModules: [moduleSchema],
    stats: {
      views: { type: Number, default: 0 },
      purchases: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);

