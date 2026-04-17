import { z } from 'zod';

export const scheduledPostSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    caption: z.string().optional(),
    postType: z.enum(['image', 'carousel', 'reel', 'story']).optional(),
    mediaAssets: z.array(z.string()).optional(),
    scheduledFor: z.string(),
    status: z.enum(['draft', 'scheduled', 'published', 'failed']).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

