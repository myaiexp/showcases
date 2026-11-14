// tanstack-charts example: Heatmap with cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap with cell',
  summary:
    'cell is rect without endpoint options: x and y are categories on two band scales, and each row fills one grid cell. A continuous colour channel and a d3 colour range shade it by value; the checkbox switches the cell inset.',
  section: 'Bar and Rect Marks',
  tags: ['cell', 'color', 'scaleBand', 'd3 color scale'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
