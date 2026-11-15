// penrose example: inRange: keeping a coordinate inside a band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "inRange: keeping a coordinate inside a band",
  summary:
    'A circle is pulled towards the right edge of the canvas. `ensure inRange(a.icon.center[0], x0, x1)` holds its x coordinate inside the green band, so it stops at the band\'s right edge or, for a band on the left, at its nearest edge.',
  section: "Constraint Functions",
  tags: ['inRange', 'ensure', 'constraint', 'nearPt', 'encourage'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
