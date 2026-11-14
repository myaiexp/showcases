// Zod example: Base64 and base64url, both ways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Base64 and base64url, both ways',
  summary:
    "base64ToBytes and base64urlToBytes (defined as the docs show) convert the two spellings of base64 to bytes and back. The checks differ: base64 insists on padding and uses + and /, base64url has no padding and uses - and _.",
  section: 'Codecs',
  tags: ['z.codec', 'z.base64', 'z.base64url', 'z.util.base64ToUint8Array', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
