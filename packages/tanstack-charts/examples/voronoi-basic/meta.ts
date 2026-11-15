// tanstack-charts example: Voronoi cells behind a scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Voronoi cells behind a scatter",
  summary:
    "Each car owns the region of the plot closest to it. The cells are colored by cylinder count at low opacity, clipped to the plot, and the dots drawn above them provide the focus and tooltip, since the cells emit no interaction points.",
  section: "Voronoi Mark",
  tags: ['voronoi', 'key', 'color', 'fillOpacity', 'dot', 'tooltip'],
  docs: ['repo/docs/reference/marks/voronoi.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
