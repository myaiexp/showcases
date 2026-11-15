// penrose example: contains1D: one interval inside another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "contains1D: one interval inside another",
  summary:
    'Two horizontal lines stand for the intervals [l1, r1] and [l2, r2]. The blue interval is pulled out to both canvas edges, and `ensure contains1D((b.start, b.end), (a.start, a.end))` makes the fixed orange interval contain it, so the blue line shrinks to fit.',
  section: "Constraint Functions",
  tags: ['contains1D', 'ensure', 'constraint', 'interval', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
