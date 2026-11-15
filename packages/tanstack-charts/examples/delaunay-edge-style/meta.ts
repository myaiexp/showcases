// tanstack-charts example: Style edges by their endpoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Style edges by their endpoints",
  summary:
    "Paint callbacks receive the derived edge, which holds both endpoint rows. Edges between cars of the same cylinder count are thin and blue; edges that join different engine sizes are thicker and orange.",
  section: "Delaunay Link Mark",
  tags: ['delaunayLink', 'stroke', 'strokeWidth', 'strokeOpacity', 'DelaunayLinkDatum'],
  docs: ['repo/docs/reference/marks/delaunay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
