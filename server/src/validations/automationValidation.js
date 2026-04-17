import { z } from 'zod';

export const automationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    triggerSource: z.string().optional(),
    targetContentId: z.string().optional(),
    matchMode: z.enum(['exact', 'contains', 'any']).optional(),
    keywords: z.array(z.string()).optional(),
    messageTemplate: z.string().min(3),
    followUpMessage: z.string().optional(),
    followUpDelayMinutes: z.number().int().nonnegative().optional(),
    isActive: z.boolean().optional(),
    rateLimitPerHour: z.number().int().positive().optional(),
    createLead: z.boolean().optional(),
    tagLeadWith: z.array(z.string()).optional()
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

