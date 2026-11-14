// observable-plot example: Delaunay: Voronoi cells by species
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Delaunay: Voronoi cells by species",
  summary: "A voronoi mark tiles the plot with one cell per penguin, filled by species at low opacity with a background-coloured stroke, under a frame and the dots themselves.",
  section: 'Mark: Delaunay',
  tags: ['voronoi', 'frame', 'dot', 'fill', 'fillOpacity', 'stroke'],
  docs: ['repo/docs/marks/delaunay.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
