// tanstack-charts example: Adjacency follows the aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Adjacency follows the aspect ratio",
  summary:
    "The triangulation is made after scaling to pixels, so squeezing or stretching the chart changes which diagonals are Delaunay edges even though the rows and domains stay the same. The slider changes the chart height.",
  section: "Delaunay Link Mark",
  tags: ['delaunayLink', 'host.update', 'height'],
  docs: ['repo/docs/reference/marks/delaunay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
