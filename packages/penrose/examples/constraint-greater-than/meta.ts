// penrose example: greaterThan and greaterThanSq: a lower limit on a radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "greaterThan and greaterThanSq: a lower limit on a radius",
  summary:
    'The blue circle is pulled towards a radius of 32 and the orange one stays at 60. `ensure greaterThan(a.icon.r, b.icon.r)` lifts it to 60, a padding of 20 lifts it to 80, and `greaterThanSq` is the same floor with a steeper penalty.',
  section: "Constraint Functions",
  tags: ['greaterThan', 'greaterThanSq', 'ensure', 'constraint', 'padding', 'comparison sugar'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
