// css-doodle example: The aspect command
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The aspect command",
  summary:
    "When the size comes from CSS or mixes units, pieces are laid out on a square and stretch with the doodle. aspect gives the element's proportions as a number or a fraction such as 2 / 1 and wins over the one from @grid.",
  section: 'Shapes',
  tags: ['@tile', 'aspect', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
