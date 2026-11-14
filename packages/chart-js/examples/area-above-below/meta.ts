// Chart.js example: One colour above a line, another below
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One colour above a line, another below',
  summary:
    'Room temperature shaded red where it is above a comfort level and blue where it is below. The fill object takes a target, plus above and below colours.',
  section: 'Chart types',
  tags: ['area', 'fill', 'above', 'below', 'target'],
  docs: ['repo/docs/charts/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
