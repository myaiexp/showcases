// observable-plot example: Delaunay: convex hulls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: convex hulls",
  summary: "The hull mark outlines the minimum-perimeter polygon around the points; with fill set to species it draws one hull per species, a z channel splitting the series.",
  section: 'Mark: Delaunay',
  tags: ['hull', 'dot', 'fill', 'fillOpacity', 'stroke'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
