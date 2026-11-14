// tanstack-charts example: Clipping marks to the plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clipping marks to the plot',
  summary:
    'A random walk over a fixed y range of 30 to 70. With clip: true marks stop at the plot edge; without it they paint into the margins.',
  section: 'Marks and Layering',
  tags: ['clip', 'margin', 'scaleLinear'],
  docs: ['repo/docs/concepts/marks-and-layering.md', 'repo/docs/reference/chart-spec.md', 'repo/docs/concepts/layout-axes-and-coordinates.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
