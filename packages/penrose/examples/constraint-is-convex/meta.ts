// penrose example: isConvex: a polygon without dents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isConvex: a polygon without dents",
  summary:
    'A dented six-cornered polygon whose corners are free to move. `ensure isConvex(points, true)` combines the same-turn rule with a turning-number check, so the polygon winds once and no corner points inward; the dents flatten out into a triangle.',
  section: "Constraint Functions",
  tags: ['isConvex', 'ensure', 'constraint', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
