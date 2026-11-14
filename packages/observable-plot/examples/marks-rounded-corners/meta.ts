// observable-plot example: Marks: rounded corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: rounded corners',
  summary:
    'Bars with r on all corners, a single side (rx1, rx2, ry1, ry2) or corner (rx1y1 and so on), or elliptical rx and ry.',
  section: 'Marks',
  tags: ['r', 'rx', 'ry', 'rx1', 'rx2', 'ry1', 'ry2', 'rx1y1', 'rx1y2', 'rx2y1', 'rx2y2', 'Plot.barY'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
