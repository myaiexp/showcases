// tanstack-charts example: Hexagonal bins of a scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagonal bins of a scatter",
  summary:
    "600 cars binned into hexagons after the chart has fixed its scales. Each bin gets a count output that drives a sequential color scale, and the tooltip shows the whole bin datum.",
  section: "Hexbin Mark",
  tags: ['tooltip format', 'hexbin', 'binWidth', 'color', 'count', 'scaleSequential'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/marks/hexbin.md',
    'repo/docs/reference/scales-guides-and-color.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
