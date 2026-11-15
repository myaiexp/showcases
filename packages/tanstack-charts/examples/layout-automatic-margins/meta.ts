// tanstack-charts example: Automatic margins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic margins',
  summary:
    'The layout solver measures tick labels, rotation and titles. Switch to long labels, rotate them or hide titles and the plot rectangle in the caption adjusts.',
  section: 'Layout, Axes, and Coordinates',
  tags: ['margin', 'tickLabels.rotate', 'scene.chart'],
  docs: [
    'repo/docs/concepts/layout-axes-and-coordinates.md',
    'repo/docs/reference/chart-spec.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
