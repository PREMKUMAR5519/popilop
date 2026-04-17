import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import env from '../../config/env.js';
import ApiError from '../../utils/apiError.js';

const hasR2Config = Boolean(
  env.r2.accountId &&
    env.r2.accessKeyId &&
    env.r2.secretAccessKey &&
    env.r2.bucketName
);

const r2Client = hasR2Config
  ? new S3Client({
      region: env.r2.region,
      endpoint: `https://${env.r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.r2.accessKeyId,
        secretAccessKey: env.r2.secretAccessKey
      }
    })
  : null;

export const validateUpload = file => {
  const allowed = ['image/', 'video/', 'application/pdf', 'application/zip'];
  const maxSize = 25 * 1024 * 1024;
  const isAllowed = allowed.some(type => file.mimetype.startsWith(type) || file.mimetype === type);
  return {
    valid: isAllowed && file.size <= maxSize,
    maxSize
  };
};

export const uploadBuffer = async ({ buffer, contentType, key }) => {
  if (!r2Client) {
    throw new ApiError(
      503,
      'Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL.'
    );
  }

  await r2Client.send(
    new PutObjectCommand({
      Bucket: env.r2.bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType
    })
  );

  return {
    key,
    url: `${env.r2.publicUrl}/${key}`,
    provider: 'cloudflare-r2'
  };
};

export const deleteAsset = async key => {
  if (!r2Client) {
    throw new ApiError(503, 'Cloudflare R2 is not configured');
  }

  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: env.r2.bucketName,
      Key: key
    })
  );

  return true;
};
