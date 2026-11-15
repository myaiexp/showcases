// css-doodle example: Bound the regions to the shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bound the regions to the shape",
  summary:
    "bound: shape cuts the voronoi regions at the shape's outline, holes included, before gap and round, so the pieces stay inside a ring instead of filling the box. The default bound: box fills the square.",
  section: 'Shapes',
  tags: ['@tile', 'bound', 'subtract', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
