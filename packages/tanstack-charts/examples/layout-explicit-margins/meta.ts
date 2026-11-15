// tanstack-charts example: Explicit margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Explicit margins',
  summary:
    'margin locks only the sides you give. Compare automatic margins, { left: 80 }, a mixed object and margin: 0, with the resulting plot rectangle shown.',
  section: 'Layout, Axes, and Coordinates',
  tags: ['margin', 'scene.chart'],
  docs: [
    'repo/docs/concepts/layout-axes-and-coordinates.md',
    'repo/docs/reference/chart-spec.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
