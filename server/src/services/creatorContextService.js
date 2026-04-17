import CreatorProfile from '../models/CreatorProfile.js';
import ApiError from '../utils/apiError.js';

export const getCreatorProfileByUserId = async userId => {
  const profile = await CreatorProfile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, 'Creator profile not found');
  }
  return profile;
};

