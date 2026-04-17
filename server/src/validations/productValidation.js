import { z } from 'zod';

export const productSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().nonnegative().optional(),
    compareAtPrice: z.number().nonnegative().optional(),
    thumbnail: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    deliveryType: z.enum(['download', 'external-link', 'course', 'physical']).optional(),
    affiliateUrl: z.string().url().optional().or(z.literal('')),
    publishedState: z.enum(['draft', 'published', 'archived']).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    courseModules: z.array(z.any()).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

