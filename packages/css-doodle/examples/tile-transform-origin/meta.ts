// css-doodle example: Pieces that pulse in place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pieces that pulse in place",
  summary:
    "In clip-path, @tile also sets the cell's transform-origin to the centre of its piece, so scale and rotate and their animations work on each piece in place. Forty hexagons shrink and grow out of step.",
  section: 'Shapes',
  tags: ['@tile', 'transform-origin', '@keyframes', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
