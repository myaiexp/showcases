// penrose example: containsPolyPoint: a point kept inside a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsPolyPoint: a point kept inside a polygon",
  summary:
    'A point is pulled out of a fixed polygon. `ensure containsPolyPoint(a.icon.points, b.icon.center, padding)` holds it inside; with padding 30 it keeps its distance from the edges.',
  section: "Constraint Functions",
  tags: ['containsPolyPoint', 'ensure', 'constraint', 'padding', 'Polygon', 'point'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
