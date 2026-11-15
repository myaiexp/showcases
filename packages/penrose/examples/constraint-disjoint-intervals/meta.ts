// penrose example: disjointIntervals: two lines that share no x range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "disjointIntervals: two lines that share no x range",
  summary:
    'Each line stands for an interval on the x axis, and both are pulled to cover the same span. `ensure disjointIntervals(a.icon, b.icon)` keeps their x ranges apart, so one slides to the left of the other.',
  section: "Constraint Functions",
  tags: ['disjointIntervals', 'ensure', 'constraint', 'interval', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
