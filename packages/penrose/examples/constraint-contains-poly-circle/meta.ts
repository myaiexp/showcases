// penrose example: containsPolyCircle: a circle kept inside a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsPolyCircle: a circle kept inside a polygon",
  summary:
    'The orange circle is pulled out of a fixed hexagon-like polygon. `ensure containsPolyCircle(a.icon.points, b.icon.center, b.icon.r, padding)` keeps the whole circle inside.',
  section: "Constraint Functions",
  tags: ['containsPolyCircle', 'ensure', 'constraint', 'padding', 'Polygon', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
