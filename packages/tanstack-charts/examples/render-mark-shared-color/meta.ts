// tanstack-charts example: A custom mark on the shared color scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom mark on the shared color scale",
  summary:
    "A custom pill mark declares a color channel with scale 'color' and asks the render context for each category's color. The chart then builds its palette and legend from that channel like any built-in mark would.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'color channel', 'context.color', 'colorLegend'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/guides/legends-and-color.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
