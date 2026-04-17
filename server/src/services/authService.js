import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import CreatorProfile from '../models/CreatorProfile.js';
import LandingPage from '../models/LandingPage.js';
import CreatorSetting from '../models/CreatorSetting.js';
import ApiError from '../utils/apiError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';

export const signup = async payload => {
  const existing = await User.findOne({ email: payload.email });

  if (existing) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const slugExists = await CreatorProfile.findOne({ slug: payload.slug });
  if (slugExists) {
    throw new ApiError(409, 'Creator slug is already taken');
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    passwordHash,
    role: 'creator'
  });

  const creatorProfile = await CreatorProfile.create({
    user: user._id,
    displayName: payload.name,
    slug: payload.slug,
    headline: 'Creator strategist, educator, and digital product seller'
  });

  await LandingPage.create({
    creator: creatorProfile._id,
    title: `${payload.name} | Creator Hub`,
    slug: payload.slug,
    metaTitle: `${payload.name} | Creator Hub`
  });

  await CreatorSetting.create({
    creator: creatorProfile._id
  });

  return issueSession(user);
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.lastLoginAt = new Date();
  await user.save();

  return issueSession(user);
};

export const refreshSession = async refreshToken => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token required');
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Refresh token is invalid');
  }

  return issueSession(user);
};

export const issueSession = async user => {
  const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });
  const refreshToken = signRefreshToken({ sub: user._id.toString(), role: user.role });
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username || null,
      avatar: user.avatar || null
    },
    accessToken,
    refreshToken
  };
};

export const logout = async userId => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};

