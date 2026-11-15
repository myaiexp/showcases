// tanstack-charts example: A grid spatial index for dense points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A grid spatial index for dense points',
  summary:
    'The default lookup scans every point on each pointer move. A spatialIndex factory replaces it: this one hashes the points into a grid and checks only the cells near the pointer. The readout counts the candidates examined per lookup, with and without the index.',
  section: 'Tooltips and Focus',
  tags: ['spatialIndex', 'ChartSpatialIndexFactory', 'findNearest', 'maxFocusDistance'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
