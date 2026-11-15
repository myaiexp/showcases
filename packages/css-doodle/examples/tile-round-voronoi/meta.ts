// css-doodle example: Round corners of pieces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Round corners of pieces",
  summary:
    "round turns the corners of every piece into curves of this radius, so a radius as large as the pieces leaves no straight edge. A rounded piece is a CSS shape() with true curves, not a polygon.",
  section: 'Shapes',
  tags: ['@tile', 'round', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
