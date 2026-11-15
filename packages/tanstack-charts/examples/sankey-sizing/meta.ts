// tanstack-charts example: Node width, padding and inset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node width, padding and inset",
  summary:
    "nodeWidth is a function of the final chart bounds (a percentage of the width with a minimum), nodePadding a fixed pixel gap inside each column, and inset the margin kept free around the diagram on each side.",
  section: "Sankey Diagram Mark",
  tags: ['sankeyDiagram', 'nodeWidth', 'nodePadding', 'inset', 'ChartBounds'],
  docs: ['repo/docs/reference/marks/sankey.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
