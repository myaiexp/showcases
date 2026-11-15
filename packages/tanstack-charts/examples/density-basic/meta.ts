// tanstack-charts example: Density contours of a point cloud
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density contours of a point cloud",
  summary:
    "80 points become a two-dimensional kernel density estimate, drawn as six translucent bands with exact density thresholds, one stroke per level, and the raw points layered above for reference.",
  section: "Density Contour Mark",
  tags: ['densityContour', 'thresholds', 'bandwidth', 'fillOpacity', 'dot'],
  docs: ['repo/docs/reference/marks/density.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
