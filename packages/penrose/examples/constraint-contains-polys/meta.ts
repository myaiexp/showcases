// penrose example: containsPolys: a polygon kept inside a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsPolys: a polygon kept inside a polygon",
  summary:
    'A small quadrilateral with a free position is pulled out of a fixed polygon. `ensure containsPolys(a.icon.points, b.icon.points, padding)` keeps all its corners inside.',
  section: "Constraint Functions",
  tags: ['containsPolys', 'ensure', 'constraint', 'padding', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
