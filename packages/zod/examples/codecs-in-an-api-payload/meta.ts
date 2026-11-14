// Zod example: Codecs inside an object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Codecs inside an object',
  summary:
    "Codecs are schemas like any other, so they nest. One object schema turns a JSON payload (an id as text, a date as text, a link as text) into real values (bigint, Date, URL) and turns the values back into the payload; a bad field is pinned by its path.",
  section: 'Codecs',
  tags: ['z.codec', 'z.object', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
