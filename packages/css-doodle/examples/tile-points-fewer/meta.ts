// css-doodle example: points: fewer pieces than cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "points: fewer pieces than cells",
  summary:
    "points sets a smaller number of pieces, and the cells left without one show nothing. It counts pieces, not corners as in @shape, so here 12 of 60 cells are drawn.",
  section: 'Shapes',
  tags: ['@tile', 'points', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
