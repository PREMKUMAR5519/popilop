import multer from 'multer';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { uploadMediaAsset } from '../services/mediaService.js';

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadAssetController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await uploadMediaAsset({
    creatorId: creator._id,
    file: req.file,
    folder: req.body.folder || 'general'
  });
  res.status(201).json({ success: true, item });
});

