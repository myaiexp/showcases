// observable-plot example: Delaunay: mesh per species
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: mesh per species",
  summary: "delaunayMesh draws the triangulation of the points; a z or stroke channel makes a separate triangulation per series. A toggle compares one mesh for all points with one per species.",
  section: 'Mark: Delaunay',
  tags: ['delaunayMesh', 'z', 'stroke', 'strokeOpacity'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
