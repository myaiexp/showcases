// observable-plot example: Delaunay: links coloured by body mass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: links coloured by body mass",
  summary: "delaunayLink draws each edge of the triangulation as a link; stroke takes body mass from one arbitrary endpoint of each edge.",
  section: 'Mark: Delaunay',
  tags: ['delaunayLink', 'stroke', 'strokeWidth'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
