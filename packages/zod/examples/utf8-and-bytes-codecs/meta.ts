// Zod example: Text to bytes and bytes to text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text to bytes and bytes to text',
  summary:
    "utf8ToBytes and bytesToUtf8 (defined as the docs show) are the same conversion written in opposite directions. Multi-byte characters take several bytes; bytes that are not valid UTF-8 decode to replacement characters instead of failing, so they do not come back the same.",
  section: 'Codecs',
  tags: ['z.codec', 'z.instanceof', 'Uint8Array', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
