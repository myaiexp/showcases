// Zod example: Coerce text into big integers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coerce text into big integers',
  summary:
    'z.coerce.bigint() runs BigInt(input): whole-number text and numbers work, decimals and words are rejected. Watch the oddities: empty text becomes 0n and true becomes 1n.',
  section: 'Primitives and coercion',
  tags: ['z.coerce.bigint', 'z.bigint', 'coercion'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
