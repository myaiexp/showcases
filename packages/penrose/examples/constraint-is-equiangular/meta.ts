// penrose example: isEquiangular: all corners the same angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isEquiangular: all corners the same angle",
  summary:
    'An uneven quadrilateral whose corners are free to move. `ensure isEquiangular(points, true)` makes the turn at every corner equal, giving a rectangle whose sides may differ in length.',
  section: "Constraint Functions",
  tags: ['isEquiangular', 'ensure', 'constraint', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Curves.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
