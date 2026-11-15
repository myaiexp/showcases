// penrose example: containsCircles: one circle inside another, by numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsCircles: one circle inside another, by numbers",
  summary:
    'Same idea as `contains`, but the function takes centres and radii rather than shapes. The orange circle is pulled out of the blue one; `ensure containsCircles(c1, r1, c2, r2, padding)` keeps it inside, with a margin when padding is set.',
  section: "Constraint Functions",
  tags: ['containsCircles', 'ensure', 'constraint', 'padding', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
