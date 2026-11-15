// penrose example: contains: one shape inside another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "contains: one shape inside another",
  summary:
    'A small orange circle is pulled towards the lower right while the blue shape stays fixed. `ensure contains(a.icon, b.icon, 20)` keeps it inside with a margin of 20; the same call handles a circle, a rectangle and a polygon as the container.',
  section: "Constraint Functions",
  tags: ['contains', 'ensure', 'constraint', 'padding', 'Circle', 'Rectangle', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
