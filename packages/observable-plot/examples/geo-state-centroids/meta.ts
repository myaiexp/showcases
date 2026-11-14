// observable-plot example: Geo: state centroids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo: state centroids',
  summary:
    'US states drawn with geo, plus red dots at each centroid from the centroid transform. With tip on, the geo mark gets the same implicit x and y channels.',
  section: 'Mark: Geo',
  tags: ['geo', 'centroid', 'dot', 'tip', 'albers-usa'],
  docs: ['repo/docs/marks/geo.md', 'repo/docs/transforms/centroid.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
