import { z } from 'zod';

export const metadataSchema = z.object({
  title: z.string(),
  version: z.string(),
  jurisdiction: z.string().optional(),
  audience: z.enum(['public', 'internal']).optional(),
  tags: z.array(z.string()).default([]),
});

export type DocMetadata = z.infer<typeof metadataSchema>;

export const validateMetadata = (data: unknown): DocMetadata => {
  const parsed = metadataSchema.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid metadata: ${details}`);
  }

  return parsed.data;
};
