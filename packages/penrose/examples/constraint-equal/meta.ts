// penrose example: equal: two radii forced to match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "equal: two radii forced to match",
  summary:
    'The orange circle is pulled towards a radius of 35 while the blue one stays at 70. With `ensure equal(a.icon.r, b.icon.r)` the constraint wins and the orange circle grows to match; the `==` sugar writes the same constraint.',
  section: "Constraint Functions",
  tags: ['equal', 'ensure', 'constraint', 'comparison sugar', 'encourage'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/docs-site/docs/ref/style/selector-blocks.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
