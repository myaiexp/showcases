// penrose example: disjoint: shapes that must not overlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "disjoint: shapes that must not overlap",
  summary:
    'Both shapes are pulled to the middle of the canvas, where they would sit on top of each other. `ensure disjoint(a.icon, b.icon)` pushes them apart until they just touch, a padding of 40 leaves a gap, and the last tab separates a circle from a rectangle.',
  section: "Constraint Functions",
  tags: ['disjoint', 'ensure', 'constraint', 'padding', 'Circle', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
