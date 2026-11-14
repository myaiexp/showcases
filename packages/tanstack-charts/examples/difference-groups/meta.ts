// tanstack-charts example: One comparison per group with z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One comparison per group with z',
  summary:
    'z splits the rows into groups and each group gets its own pair of lines and lobes. Two stores share a chart: each store\'s actual sales are compared with its own plan, so the lobes never mix between stores.',
  section: 'Difference Marks',
  tags: ['differenceY', 'z'],
  docs: ['repo/docs/reference/marks/difference.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
