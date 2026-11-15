// tanstack-charts example: Sankey diagram of energy flow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey diagram of energy flow",
  summary:
    "Ten nodes and eleven weighted links laid out by sankeyDiagram. The marks callback turns the layout into curved link ribbons colored by source, node rectangles and labels, all ordinary marks in pixel coordinates, so no x or y scale is needed.",
  section: "Sankey Diagram Mark",
  tags: ['tooltip format', 'sankeyDiagram', 'link', 'rect', 'text', 'nodeKey', 'source', 'target', 'value', 'd3Curve'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/marks/sankey.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
