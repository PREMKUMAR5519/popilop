import MediaAsset from '../models/MediaAsset.js';
import { uploadBuffer, validateUpload } from '../integrations/storage/cloudflareR2Service.js';
import ApiError from '../utils/apiError.js';

export const uploadMediaAsset = async ({ creatorId, file, folder = 'general' }) => {
  const validation = validateUpload(file);

  if (!validation.valid) {
    throw new ApiError(400, `Invalid file. Max size is ${validation.maxSize / 1024 / 1024}MB.`);
  }

  const key = `${creatorId}/${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '-').toLowerCase()}`;
  const uploaded = await uploadBuffer({
    buffer: file.buffer,
    contentType: file.mimetype,
    key
  });

  return MediaAsset.create({
    creator: creatorId,
    name: file.originalname,
    type: file.mimetype.startsWith('video/') ? 'video' : file.mimetype.startsWith('application/') ? 'document' : 'image',
    mimeType: file.mimetype,
    size: file.size,
    folder,
    provider: uploaded.provider,
    url: uploaded.url,
    key: uploaded.key
  });
};

