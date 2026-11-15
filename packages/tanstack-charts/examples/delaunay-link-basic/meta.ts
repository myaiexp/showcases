// tanstack-charts example: Delaunay neighbour links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay neighbour links",
  summary:
    "50 cars with a link between every pair that are neighbours in the Delaunay triangulation of their pixel positions. The key channel keeps edge identities stable, and dots on top give the points their own tooltip.",
  section: "Delaunay Link Mark",
  tags: ['delaunayLink', 'key', 'dot', 'tooltip'],
  docs: [
    'repo/docs/reference/marks/delaunay.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
