// Zod example: Trimming runs in both directions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trimming runs in both directions',
  summary:
    "Mutating helpers like trim() and toLowerCase() are not one-way transforms: they run on decode and on encode, so text that arrives untidy from either side leaves tidy.",
  section: 'Codecs',
  tags: ['.trim', '.toLowerCase', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
