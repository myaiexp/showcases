// penrose example: containsCirclePoly: a polygon kept inside a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsCirclePoly: a polygon kept inside a circle",
  summary:
    'A small triangle with a free position is pulled out of the blue circle. `ensure containsCirclePoly(a.icon.center, a.icon.r, b.icon.points, padding)` keeps every corner inside the circle.',
  section: "Constraint Functions",
  tags: ['containsCirclePoly', 'ensure', 'constraint', 'padding', 'Polygon', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
