// Zod example: Basket size limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basket size limits',
  summary:
    'A shopping basket is a list of item names. Four array rules (nonempty, min, max, length) are tried on the same baskets, so you see which sizes each one lets through and the exact message it gives for the rest.',
  section: 'Arrays, tuples and unions',
  tags: ['z.array', 'nonempty', 'min', 'max', 'length'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
