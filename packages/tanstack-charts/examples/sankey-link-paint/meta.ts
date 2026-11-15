// tanstack-charts example: Link paint and curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Link paint and curve",
  summary:
    "Presentation belongs to the marks callback, so changing it never touches the layout. Links can take the color of their source or target node, a single neutral stroke, or a straight line instead of the bump curve.",
  section: "Sankey Diagram Mark",
  tags: ['sankeyDiagram', 'link', 'color', 'stroke', 'curve', 'd3Curve'],
  docs: ['repo/docs/reference/marks/sankey.md', 'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
