// observable-plot example: Delaunay: Voronoi mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: Voronoi mesh",
  summary: "voronoiMesh draws the cell boundaries once each, instead of twice as the voronoi mark does, which shows local point density under the dots.",
  section: 'Mark: Delaunay',
  tags: ['voronoiMesh', 'dot', 'fill'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
