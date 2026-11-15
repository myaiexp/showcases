// tanstack-charts example: Donut summary over a scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Donut summary over a scatter",
  summary:
    "fill gives the scatter the whole frame and inset anchors a polar donut inside it; layer paints them in that order. Every child is clipped to its frame, and the donut's hole adds no interaction target. The select moves the inset to another corner of the scatter's frame.",
  section: "View Composition",
  tags: ["composeViews", "layer", "fill", "inset", "pie", "radialArc"],
  docs: [
    'repo/docs/reference/view-composition.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
