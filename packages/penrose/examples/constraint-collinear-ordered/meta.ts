// penrose example: collinearOrdered: points on a line in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "collinearOrdered: points on a line in order",
  summary:
    'Like `collinear`, but the order is part of the constraint: B has to lie between A and C, so the two arms continue each other in one straight run. The first layout leaves the points free and the path bends.',
  section: "Constraint Functions",
  tags: ['collinearOrdered', 'ensure', 'constraint', 'vdist', 'predicate'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
