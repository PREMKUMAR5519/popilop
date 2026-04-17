import User from '../models/User.js';
import ApiError from '../utils/apiError.js';
import { verifyAccessToken } from '../utils/tokens.js';

const readBearerToken = req => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '').trim();
  }
  return req.cookies?.accessToken || null;
};

export const requireAuth = async (req, res, next) => {
  try {
    const token = readBearerToken(req);

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select('-passwordHash');

    if (!user) {
      throw new ApiError(401, 'User session is invalid');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = readBearerToken(req);
    if (!token) {
      return next();
    }

    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select('-passwordHash');
    req.user = user || null;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

