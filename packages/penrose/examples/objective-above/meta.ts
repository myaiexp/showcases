// penrose example: above and below: a vertical order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "above and below: a vertical order",
  summary:
    'The orange circle is fixed. `encourage above(a.icon, b.icon, offset)` puts the centre of the blue circle `offset` higher than the orange one (default 100), and the sideways position is left to the starting sample. In 3.3.1 `below(bottom, top)` has its sign flipped and also sends its first shape upward, so the last tab swaps the arguments to get the documented result.',
  section: "Objective Functions",
  tags: ['above', 'below', 'encourage', 'objective', 'offset'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
