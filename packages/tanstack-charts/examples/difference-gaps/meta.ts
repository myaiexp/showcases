// tanstack-charts example: Gaps in a difference
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gaps in a difference',
  summary:
    'A row with a missing value creates the same break in both areas and both lines, and later rows start new segments. The checkbox restores the missing rows so the lobes join across the hole.',
  section: 'Difference Marks',
  tags: ['differenceY', 'null gaps'],
  docs: ['repo/docs/reference/marks/difference.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
