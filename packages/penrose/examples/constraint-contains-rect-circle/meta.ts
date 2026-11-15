// penrose example: containsRectCircle: a circle kept inside a rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsRectCircle: a circle kept inside a rectangle",
  summary:
    'The orange circle is pulled out of a fixed rectangle. `ensure containsRectCircle(bboxPts(a.icon), b.icon.center, b.icon.r, padding)` keeps it inside, with the padding as a margin.',
  section: "Constraint Functions",
  tags: ['containsRectCircle', 'ensure', 'constraint', 'padding', 'Rectangle', 'Circle', 'bboxPts'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
