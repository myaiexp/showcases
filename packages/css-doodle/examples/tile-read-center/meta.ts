// css-doodle example: Colour from the piece's centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Colour from the piece's centre",
  summary:
    "@tile.y gives the piece's centre height as a percentage of the element, which makes a good amount for color-mix(). The voronoi regions shade from one colour to another top to bottom.",
  section: 'Shapes',
  tags: ['@tile.y', 'color-mix', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
