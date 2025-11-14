import { clientAPI } from '@/apis/client/instance';
import { podcastGenerateSchema } from '@/schemas/podcast';
import z from 'zod';

const generateGeekNewsPodcast = async (
  json: z.infer<typeof podcastGenerateSchema>,
  opts: { signal?: AbortSignal; onChunk?: (chunk: PodcastGenerateStatus) => void }
) => {
  const { signal, onChunk } = opts;
  const response = await clientAPI.post('geeknews/podcasts/generate', { json, signal, timeout: 100_000 });
  const { body } = response;
  if (!body) {
    throw new Error('ReadableStream not supported or empty body');
  }

  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    onChunk?.(chunk.trim() as PodcastGenerateStatus);
  }
};

export { generateGeekNewsPodcast };
