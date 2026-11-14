// Zod example: Big numbers as text, or as bigints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Big numbers as text, or as bigints',
  summary:
    "stringToBigInt and numberToBigInt are defined as the docs show. Ids too large for a plain number travel as text and decode to exact bigints. Going from a number is lossy for large values, and a bad text makes BigInt throw an ordinary error that escapes Zod's issue list.",
  section: 'Codecs',
  tags: ['z.codec', 'z.bigint', 'z.int', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
