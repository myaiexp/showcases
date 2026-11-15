// penrose example: containsCirclePoint: a point kept inside a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsCirclePoint: a point kept inside a circle",
  summary:
    'A small point is pulled towards the lower right, outside the circle. `ensure containsCirclePoint(c, r, pt, padding)` holds it on or inside the circle; a padding of 40 keeps it that far from the rim.',
  section: "Constraint Functions",
  tags: ['containsCirclePoint', 'ensure', 'constraint', 'padding', 'point'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
