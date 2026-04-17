import ScheduledPost from '../models/ScheduledPost.js';
import { getInstagramProvider } from '../integrations/instagram/providerFactory.js';

export const createScheduledPost = async (creatorId, payload) =>
  ScheduledPost.create({
    creator: creatorId,
    ...payload,
    scheduledFor: new Date(payload.scheduledFor)
  });

export const publishScheduledPost = async post => {
  const provider = getInstagramProvider(post.provider);
  const result = await provider.publishPost(post);

  post.publishResult = result;
  post.status = result.ok ? 'published' : 'scheduled';
  await post.save();

  return post;
};

