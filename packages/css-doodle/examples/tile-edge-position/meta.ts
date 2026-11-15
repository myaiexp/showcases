// css-doodle example: Edges that depend on x and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Edges that depend on x and y",
  summary:
    "x and y are the middle of the edge in the -1 to 1 space, so the curve can change across the shape. Here a triangle lattice has straight edges in the middle and wavier ones towards the sides.",
  section: 'Shapes',
  tags: ['@tile', 'edge', 'x', '@tile.triangle'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
