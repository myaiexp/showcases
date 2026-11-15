// css-doodle example: Triangles in a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Triangles in a circle",
  summary:
    "@tile.triangle lays a lattice of triangles over the shape, with @tile.k telling the downward ones from the upward ones: 1 points down and 2 up. Each kind gets its own colour.",
  section: 'Shapes',
  tags: ['@tile', '@tile.triangle', '@tile.k', '@match'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
