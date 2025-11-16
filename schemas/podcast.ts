import { z } from 'zod';

const podcastGenerateSchema = z.object({
  limit: z.coerce.number().int().min(1).max(10),
  filenamePrefix: z.string().min(1).max(32),
  textModel: z.enum(['gpt-4.1-mini', 'gpt-4.1']),
  ttsModel: z.enum(['gemini-2.5-flash-tts', 'gemini-2.5-pro-tts']),
});

export { podcastGenerateSchema };
