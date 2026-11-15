// css-doodle example: Lizards: pair: turn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lizards: pair: turn",
  summary:
    "pair: turn matches each edge with the next edge around a corner instead of the opposite one, as in Escher's lizards: every piece is the same shape, turned. @tile.k tells the turns apart, in steps of 120 degrees on a hex.",
  section: 'Shapes',
  tags: ['@tile', 'pair', 'edge', '@tile.k', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
