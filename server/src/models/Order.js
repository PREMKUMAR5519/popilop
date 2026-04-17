import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'CreatorProfile', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customerName: String,
    customerEmail: String,
    amount: Number,
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'paid', 'fulfilled', 'refunded'], default: 'pending', index: true },
    paymentProvider: { type: String, default: 'manual-placeholder' },
    deliveryUrl: String,
    affiliateSource: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);

