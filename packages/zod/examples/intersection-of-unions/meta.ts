// Zod example: Intersection of two unions keeps only the overlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intersection of two unions keeps only the overlap',
  summary:
    'One union allows number or string, another allows number or boolean. Their intersection accepts only what both allow, which is the number. A grid shows each value against the two unions and against the intersection.',
  section: 'Arrays, tuples and unions',
  tags: ['z.intersection', 'z.union'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
