// css-doodle example: Hexagons inside a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagons inside a circle",
  summary:
    "@tile.hex and the other lattices pick the largest piece size that fits the cells and keep every piece that reaches into the shape, so the edge is jagged. r: .8 sets the circle's radius.",
  section: 'Shapes',
  tags: ['@tile', '@tile.hex', 'circle', 'r'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
