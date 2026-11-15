// tanstack-charts example: Frame fill, stroke, inset and radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Frame fill, stroke, inset and radius",
  summary:
    "frame paints the resolved inner chart bounds. It is placed before the line so it sits behind it. The select cycles a thin border, a filled panel with no border, a rounded frame, and an inset blue frame with a thick stroke.",
  section: "Text, Frame, and Facet",
  tags: ['frame', 'fill', 'stroke', 'strokeOpacity', 'inset', 'radius'],
  docs: ['repo/docs/reference/marks/text-frame-and-facet.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
