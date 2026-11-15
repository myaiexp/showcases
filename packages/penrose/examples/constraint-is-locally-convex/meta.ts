// penrose example: isLocallyConvex: every corner turns the same way
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isLocallyConvex: every corner turns the same way",
  summary:
    'A dented six-cornered polygon whose corners are free to move. `ensure isLocallyConvex(points, true)` makes every corner turn in the same direction, which flattens the dents until the polygon is a triangle with three corners lying on its sides; a shape may still wind round twice, which `isConvex` also rules out.',
  section: "Constraint Functions",
  tags: ['isLocallyConvex', 'ensure', 'constraint', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
