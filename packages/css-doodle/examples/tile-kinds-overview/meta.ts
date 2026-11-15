// css-doodle example: Every kind on the same square
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Every kind on the same square",
  summary:
    "Each kind cuts the default square into 30 pieces: slice, voronoi, delaunay, grid, hex, triangle, cube, penrose and circle. The buttons change only the name after @tile.",
  section: 'Shapes',
  tags: ['@tile', '@tile.slice', '@tile.voronoi', '@tile.grid', '@tile.hex', '@tile.triangle', '@tile.cube', '@tile.penrose', '@tile.circle', '@tile.delaunay'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
