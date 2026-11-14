// Zod example: Exactly this value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Exactly this value',
  summary:
    'z.literal() accepts one exact value and nothing else: a word, a number, a bigint or true. The text "12" is not the number 12, and "Tuna" is not "tuna".',
  section: 'Primitives and coercion',
  tags: ['z.literal'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
