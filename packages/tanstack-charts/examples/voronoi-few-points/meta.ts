// tanstack-charts example: One, two, collinear and coincident points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One, two, collinear and coincident points",
  summary:
    "The documented small cases: one unique position fills the whole plot, two split it, collinear points give parallel strips, and rows at exactly the same position share one cell owned by the smallest key.",
  section: "Voronoi Mark",
  tags: ['voronoi', 'key', 'coincident'],
  docs: ['repo/docs/reference/marks/voronoi.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
