import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['creator', 'admin'], default: 'creator', index: true },
    status: { type: String, enum: ['active', 'invited', 'suspended'], default: 'active' },
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    avatar: String,
    onboardingCompleted: { type: Boolean, default: false },
    refreshToken: String,
    lastLoginAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

