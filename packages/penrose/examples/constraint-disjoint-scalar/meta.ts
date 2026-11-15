// penrose example: disjointScalar: a coordinate kept out of a range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "disjointScalar: a coordinate kept out of a range",
  summary:
    'A circle is pulled to the middle of the canvas, which sits inside the green band. `ensure disjointScalar(a.icon.center[0], -100, 100)` forbids its x coordinate from lying in the band, so it settles on one of the band\'s edges.',
  section: "Constraint Functions",
  tags: ['disjointScalar', 'ensure', 'constraint', 'nearPt', 'encourage'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
