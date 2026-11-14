// Zod example: Union: the first option that fits wins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Union: the first option that fits wins',
  summary:
    'A union tries its options in order and returns the first success. With z.coerce.number() first, the text "42" becomes the number 42; with z.string() first, the same text stays text. Same two options, different order, different output.',
  section: 'Arrays, tuples and unions',
  tags: ['z.union', 'z.coerce.number', 'z.string'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
