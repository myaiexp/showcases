// observable-plot example: Delaunay: one-dimensional Voronoi
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: one-dimensional Voronoi",
  summary: "With only x given, the voronoi mark splits the axis into intervals around each body mass, and voronoiMesh draws their boundaries as white lines.",
  section: 'Mark: Delaunay',
  tags: ['voronoi', 'voronoiMesh', 'fill', 'stroke'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
