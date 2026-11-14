// observable-plot example: Centroid: hexbin of counties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centroid: hexbin of counties',
  summary:
    'geoCentroid feeds county longitudes and latitudes to hexbin, which sizes a hexagon by how many counties fall in it.',
  section: 'Transform: Centroid',
  tags: ['dot', 'hexbin', 'geoCentroid', 'r'],
  docs: ['repo/docs/transforms/centroid.md', 'repo/docs/transforms/hexbin.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
