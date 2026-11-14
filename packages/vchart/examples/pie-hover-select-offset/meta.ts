// vchart example: Pie hover and selected sector offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie hover and selected sector offset",
  summary:
    "pie.state.hover and pie.state.selected give a sector a centerOffset and an outline. Here setHovered and setSelected drive the states from code, which is also how the preview walks around the pie; the full view adds buttons and real pointer hover.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'state', 'hover', 'selected', 'centerOffset', 'setHovered', 'setSelected'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
