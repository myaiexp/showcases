// Zod example: Hash digests by length and encoding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hash digests by length and encoding',
  summary:
    'z.hash("sha256") accepts a 64-character hexadecimal digest and nothing else. Change the algorithm or the encoding (hex, base64, base64url) and the expected length and alphabet change with it.',
  section: 'Strings and formats',
  tags: ['z.hash', 'enc'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
