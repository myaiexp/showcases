// css-doodle example: Edge reading other commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Edge reading other commands",
  summary:
    "The edge expression can read other commands of the body: a variable a is declared as .1 * x and the edge uses it. The same works for any name that is not a built-in command.",
  section: 'Shapes',
  tags: ['@tile', 'edge', '@tile.grid'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
