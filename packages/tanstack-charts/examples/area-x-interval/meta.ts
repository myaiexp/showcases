// tanstack-charts example: Horizontal interval with areaX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal interval with areaX',
  summary:
    'areaX is the transposed interval area: x1 and x2 are the left and right edges and y runs along the vertical axis. It shows the daily temperature range over a month, rotated so time reads from top to bottom.',
  section: 'Line and Area Marks',
  tags: ['areaX', 'x1', 'x2', 'lineX'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
