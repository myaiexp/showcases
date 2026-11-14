// observable-plot example: Centroid: county voronoi
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centroid: county voronoi',
  summary:
    'A voronoi mark whose points are the county centroids, so every county gets a cell in the Albers projection.',
  section: 'Transform: Centroid',
  tags: ['voronoi', 'centroid', 'albers'],
  docs: ['repo/docs/transforms/centroid.md', 'repo/docs/marks/delaunay.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
