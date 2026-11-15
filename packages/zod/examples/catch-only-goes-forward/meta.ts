// Zod example: A fallback does not apply when encoding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A fallback does not apply when encoding',
  summary:
    "catch() rescues bad input while decoding: 1234 becomes the fallback text. Encoding has no rescue, so the same 1234 is refused on the way out.",
  section: 'Codecs',
  tags: ['.catch', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
