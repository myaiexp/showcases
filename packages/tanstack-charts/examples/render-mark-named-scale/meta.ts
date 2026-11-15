// tanstack-charts example: A custom mark on a named scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom mark on a named scale",
  summary:
    "A custom mark binds to a named scale called rate instead of y. createMark's fourth and fifth type parameters name the scale ids, the chart declares rate as a second y scale on the right side, and the mark draws a step line through it next to a bar chart on the main y axis.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'named scale', 'TYScaleId', 'channel'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
