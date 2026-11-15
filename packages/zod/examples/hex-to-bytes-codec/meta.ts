// Zod example: Hex text to bytes and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hex text to bytes and back',
  summary:
    "hexToBytes (defined as the docs show) reads hexadecimal text into bytes and writes it back in lowercase. Odd-length hex passes z.hex() but the conversion function throws a plain Error, so it never becomes a Zod issue.",
  section: 'Codecs',
  tags: ['z.codec', 'z.hex', 'z.util.hexToUint8Array', 'safeDecode', 'safeEncode'],
  docs: ['repo/packages/docs/content/codecs.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
