// penrose example: touching: shapes that just meet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "touching: shapes that just meet",
  summary:
    'Both shapes are pulled apart, but `ensure touching(a.icon, b.icon)` holds them edge to edge. A padding of 30 keeps a gap of that size between them, and the last tab touches a circle to a rectangle.',
  section: "Constraint Functions",
  tags: ['touching', 'ensure', 'constraint', 'padding', 'Circle', 'Rectangle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
