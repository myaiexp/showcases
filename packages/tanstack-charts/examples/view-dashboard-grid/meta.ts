// tanstack-charts example: Four different charts as one figure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Four different charts as one figure",
  summary:
    "A grid composition holds charts of different kinds: a bar chart, a line, a scatter and a donut. They stay separate definitions with their own scales and margins but share one host, one accessible label and one tooltip. Hover any of the four.",
  section: "View Composition",
  tags: ["composeViews", "grid", "defineChart", "tooltip"],
  docs: ["repo/docs/reference/view-composition.md", "repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
