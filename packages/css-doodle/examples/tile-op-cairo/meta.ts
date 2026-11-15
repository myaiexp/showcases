// css-doodle example: Cairo pentagons with op: g
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cairo pentagons with op: g",
  summary:
    "Letters combine and run right to left as in Conway's notation, so ds applies s first and then d. On a grid that gives the Cairo tiling of pentagons, which g writes in one letter.",
  section: 'Shapes',
  tags: ['@tile', 'op', '@tile.grid'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
