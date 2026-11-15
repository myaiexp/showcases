// penrose example: containsCircleRect: a rectangle kept inside a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsCircleRect: a rectangle kept inside a circle",
  summary:
    'The orange rectangle is pulled out of the blue circle. `ensure containsCircleRect(a.icon.center, a.icon.r, bboxPts(b.icon))` keeps it in, but it treats the rectangle as a circle around its centre, so the margin is generous.',
  section: "Constraint Functions",
  tags: ['containsCircleRect', 'ensure', 'constraint', 'Rectangle', 'Circle', 'bboxPts'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
