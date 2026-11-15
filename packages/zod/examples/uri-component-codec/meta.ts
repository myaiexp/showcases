// Zod example: Percent-encoding as a codec
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Percent-encoding as a codec',
  summary:
    "uriComponent (defined as the docs show) decodes percent-escapes like %20 into plain text and encodes text back with encodeURIComponent. Text that is not a valid escape sequence makes decodeURIComponent throw an ordinary URIError.",
  section: 'Codecs',
  tags: ['z.codec', 'z.string', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
