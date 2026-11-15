// tanstack-charts example: How much one cell is worth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'How much one cell is worth',
  summary:
    'The unit option sets the value of one complete cell, so a larger unit means fewer cells for the same data. Counts of visitors go from one cell per visitor to one cell per twenty; the leftover sits in a final partial cell.',
  section: 'Waffle Marks',
  tags: ['waffleY', 'unit', 'partial cells'],
  docs: ['repo/docs/reference/marks/waffle.md', 'repo/docs/guides/legends-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
