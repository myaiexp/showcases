// css-doodle example: Penrose rhombs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Penrose rhombs",
  summary:
    "@tile.penrose is a Penrose tiling of thin and thick rhombs, and @tile.k is 1 for thin and 2 for thick. color-mix() picks between two colours from the kind.",
  section: 'Shapes',
  tags: ['@tile.penrose', '@tile.k', 'color-mix'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
