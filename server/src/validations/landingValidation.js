import { z } from 'zod';

export const landingPageSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    shareImage: z.string().optional(),
    themePreset: z.string().optional(),
    isPublished: z.boolean().optional(),
    pages: z
      .array(
        z.object({
          id: z.string(),
          name: z.string().min(1),
          theme: z.string().optional(),
          meta: z
            .object({
              slug: z.string().optional(),
              title: z.string().optional(),
              metaTitle: z.string().optional(),
              metaDescription: z.string().optional()
            })
            .optional(),
          blocks: z.array(z.any()).optional()
        })
      )
      .optional(),
    selectedPageId: z.string().optional(),
    cta: z
      .object({
        label: z.string().optional(),
        url: z.string().optional()
      })
      .optional(),
    blocks: z.array(z.any()).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});
