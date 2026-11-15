// Zod example: Flip a codec around
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flip a codec around',
  summary:
    "z.invertCodec() builds the reverse codec: the input and output swap places, and so do decode and encode. The same pair of functions now reads a Date and writes text, and the round trip shows each direction.",
  section: 'Codecs',
  tags: ['z.invertCodec', 'z.codec', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
