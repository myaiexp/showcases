// penrose example: lessThan and lessThanSq: an upper limit on a radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "lessThan and lessThanSq: an upper limit on a radius",
  summary:
    'The blue circle is pulled towards a radius of 100 and the orange one stays at 60. `ensure lessThan(a.icon.r, b.icon.r)` caps it at 60, a padding of 20 caps it at 40, and `lessThanSq` is the same cap with a steeper penalty.',
  section: "Constraint Functions",
  tags: ['lessThan', 'lessThanSq', 'ensure', 'constraint', 'padding', 'comparison sugar'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
