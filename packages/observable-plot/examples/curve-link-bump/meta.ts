// observable-plot example: Curves: link mark with bump curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: link mark with bump curves',
  summary:
    'The link mark draws a curve between two points; bump-x and bump-y give Bezier links with horizontal or vertical tangents, the rest are splines.',
  section: 'Curves',
  tags: ['link', 'curve', 'bump-x', 'bump-y'],
  docs: ['repo/docs/features/curves.md', 'repo/docs/marks/link.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
