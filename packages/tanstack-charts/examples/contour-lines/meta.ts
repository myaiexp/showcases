// tanstack-charts example: Contour lines and layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour lines and layers",
  summary:
    "A contour mark can be drawn as outlines only: fill 'none' with a stroke computed from the level value, optionally dashed. Layering a translucent filled mark under a light outline mark gives a map-style look.",
  section: "Contour Mark",
  tags: ['contour', 'fill', 'stroke', 'strokeDasharray', 'fillOpacity'],
  docs: ['repo/docs/reference/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
