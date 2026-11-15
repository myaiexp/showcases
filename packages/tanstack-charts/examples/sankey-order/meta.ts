// tanstack-charts example: Node and link order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node and link order",
  summary:
    "nodeSort orders nodes inside a column and linkSort orders the links inside each node. Left undefined the layout chooses, null keeps the order of the input rows, and a comparator can sort by value.",
  section: "Sankey Diagram Mark",
  tags: ['sankeyDiagram', 'nodeSort', 'linkSort'],
  docs: ['repo/docs/reference/marks/sankey.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
