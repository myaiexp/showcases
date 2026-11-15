// css-doodle example: Voronoi density: more points at the bottom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Voronoi density: more points at the bottom",
  summary:
    "density is an expression in x, y and d, where d is how far the point is from the shape's outline. More points land where it is larger, so 1 - y makes small regions at the bottom.",
  section: 'Shapes',
  tags: ['@tile', '@tile.voronoi', 'density'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
