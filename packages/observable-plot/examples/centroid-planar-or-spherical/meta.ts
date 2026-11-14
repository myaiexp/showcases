// observable-plot example: Centroid: planar or spherical
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centroid: planar or spherical',
  summary:
    'County centroids as dots, from the centroid initializer (after projection), from geoCentroid (before projection), or both overlaid; the difference is small.',
  section: 'Transform: Centroid',
  tags: ['dot', 'centroid', 'geoCentroid', 'albers-usa'],
  docs: ['repo/docs/transforms/centroid.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
