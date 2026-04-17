import cron from 'node-cron';
import ScheduledPost from '../models/ScheduledPost.js';
import { publishScheduledPost } from '../services/schedulerService.js';

export const startSchedulerJob = () => {
  cron.schedule('*/5 * * * *', async () => {
    const pendingPosts = await ScheduledPost.find({
      status: 'scheduled',
      scheduledFor: { $lte: new Date() }
    }).limit(10);

    await Promise.all(pendingPosts.map(post => publishScheduledPost(post)));
  });
};
