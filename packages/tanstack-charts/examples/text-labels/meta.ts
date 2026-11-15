// tanstack-charts example: Data labels with text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data labels with text",
  summary:
    "text labels each dot with its city name. anchor, dx and dy are visual channels, so labels can sit above or beside a dot, and the fill callback colors the larger cities amber.",
  section: "Text, Frame, and Facet",
  tags: ['text', 'anchor', 'dx', 'dy', 'fill', 'fontSize', 'key'],
  docs: [
    'repo/docs/reference/marks/text-frame-and-facet.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
