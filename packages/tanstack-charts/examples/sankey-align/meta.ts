// tanstack-charts example: Node alignment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node alignment",
  summary:
    "The align option decides which column a node sits in: left pushes nodes toward the sources, right toward the sinks, center in between, and justify stretches terminal nodes to the last column.",
  section: "Sankey Diagram Mark",
  tags: ['sankeyDiagram', 'align', 'SankeyAlignment'],
  docs: ['repo/docs/reference/marks/sankey.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
