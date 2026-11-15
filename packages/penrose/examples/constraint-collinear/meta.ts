// penrose example: collinear: three points on one line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collinear: three points on one line",
  summary:
    'Three points joined A to B to C. `ensure collinear(a, b, c)` puts them on a straight line without fixing which one sits in the middle, so B may end up outside the other two and the arms fold back on themselves.',
  section: "Constraint Functions",
  tags: ['collinear', 'ensure', 'constraint', 'vdist', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
