// tanstack-charts example: Horizontal boxplots with boxX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Horizontal boxplots with boxX',
  summary:
    'boxX is the transposed box: x holds the observations and y the category, so the boxes lie on their side. It suits long category names and lines up with a horizontal bar chart.',
  section: 'Box Marks',
  tags: ['boxX', 'scaleBand'],
  docs: ['repo/docs/reference/marks/box.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
