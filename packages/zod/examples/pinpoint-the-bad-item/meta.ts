// Zod example: Pin the one bad item in a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pin the one bad item in a list',
  summary:
    'A list of star ratings where one entry is wrong. The issue does not just say the list is bad: its path points at the exact position (ratings[3]), and the view marks that element. Several bad entries give one issue each.',
  section: 'Arrays, tuples and unions',
  tags: ['z.array', 'issues', 'path'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
