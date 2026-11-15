// tanstack-charts example: Host options on a composed definition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Host options on a composed definition",
  summary:
    "A composed chart has one host, one tooltip and one keyboard model, so those options go on the outer definition with defineChart(composed, options), not on the children. Hover or tab through the chart: the tooltip and focus reach points in both child views.",
  section: "View Composition",
  tags: ["composeViews", "defineChart", "keyboard", "maxFocusDistance", "tooltip"],
  docs: [
    'repo/docs/reference/view-composition.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
