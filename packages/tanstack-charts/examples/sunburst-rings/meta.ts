// tanstack-charts example: Ring radii, padding and depth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ring radii, padding and depth",
  summary:
    "The ring band is set with innerRadius and outerRadius (functions of the layout radius), ringPadding leaves a fixed pixel gap between depths, and visibleDepth caps how many rings are drawn while hidden levels still count toward the angles.",
  section: "Sunburst Mark",
  tags: ['sunburst', 'innerRadius', 'outerRadius', 'ringPadding', 'visibleDepth'],
  docs: ['repo/docs/reference/marks/sunburst.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
