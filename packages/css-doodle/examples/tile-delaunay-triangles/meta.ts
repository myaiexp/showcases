// css-doodle example: Delaunay triangles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay triangles",
  summary:
    "@tile.delaunay joins scattered points into triangles and keeps the ones inside the shape, so a circle gets a ring of triangles. For delaunay and voronoi, points is the number of points, not pieces.",
  section: 'Shapes',
  tags: ['@tile', '@tile.delaunay', 'points', 'circle'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
