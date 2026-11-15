// penrose example: perpendicular: a right angle at a vertex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "perpendicular: a right angle at a vertex",
  summary:
    'Three points are joined by two arms from P. `ensure perpendicular(q, p, r)` makes the vectors p to q and p to r meet at a right angle; the first layout leaves the angle to chance. The arm lengths are bounded so the points cannot collapse onto each other.',
  section: "Constraint Functions",
  tags: ['perpendicular', 'ensure', 'constraint', 'vdist', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
