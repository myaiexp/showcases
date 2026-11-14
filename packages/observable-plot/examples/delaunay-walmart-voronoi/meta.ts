// observable-plot example: Delaunay: Walmart Voronoi under a projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: Walmart Voronoi under a projection",
  summary: "A voronoiMesh of Walmart store locations drawn through the albers projection, over the US outline and a dot per store. The projection turns longitude and latitude into planar x and y before triangulating.",
  section: 'Mark: Delaunay',
  tags: ['voronoiMesh', 'projection', 'geo', 'dot'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/walmarts.ts', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
