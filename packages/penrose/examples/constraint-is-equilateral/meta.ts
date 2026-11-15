// penrose example: isEquilateral: all edges the same length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isEquilateral: all edges the same length",
  summary:
    'An uneven quadrilateral whose corners are free to move. `ensure isEquilateral(points, true)` makes its four edges equal, giving a rhombus; the corner angles stay whatever the optimizer finds.',
  section: "Constraint Functions",
  tags: ['isEquilateral', 'ensure', 'constraint', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
