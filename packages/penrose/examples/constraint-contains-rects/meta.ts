// penrose example: containsRects: a rectangle kept inside a rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "containsRects: a rectangle kept inside a rectangle",
  summary:
    'The orange rectangle is pulled out of the fixed blue one. `ensure containsRects(bboxPts(a.icon), bboxPts(b.icon), padding)` keeps its four corners inside.',
  section: "Constraint Functions",
  tags: ['containsRects', 'ensure', 'constraint', 'padding', 'Rectangle', 'bboxPts'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
