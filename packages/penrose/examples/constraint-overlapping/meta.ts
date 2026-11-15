// penrose example: overlapping: shapes that must intersect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "overlapping: shapes that must intersect",
  summary:
    'Both shapes are pulled towards opposite sides of the canvas. `ensure overlapping(a.icon, b.icon)` makes them meet anyway, an overlap of 40 makes them cut at least 40 deep, and the last tab does the same for a circle and a rectangle.',
  section: "Constraint Functions",
  tags: ['overlapping', 'ensure', 'constraint', 'overlap', 'Circle', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
