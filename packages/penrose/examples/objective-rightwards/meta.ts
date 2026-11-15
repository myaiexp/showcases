// penrose example: rightwards and leftwards: a horizontal order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rightwards and leftwards: a horizontal order",
  summary:
    'The orange circle is fixed. `encourage rightwards(a.icon, b.icon, offset)` puts the centre of the blue circle `offset` to its right (default 100), and the height is left to the starting sample. In 3.3.1 `leftwards(left, right)` has its sign flipped and sends its first shape to the right too, so the last tab swaps the arguments to get the documented result.',
  section: "Objective Functions",
  tags: ['leftwards', 'rightwards', 'encourage', 'objective', 'offset'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
