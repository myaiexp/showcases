// observable-plot example: Tree: choosing a layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tree: choosing a layout',
  summary:
    'The treeLayout option picks the algorithm: the default tidy tree, Plot.cluster (d3.cluster, which aligns the leaves), or a custom function that assigns node.x and node.y for an indented outline.',
  section: 'Mark: Tree',
  tags: ['tree', 'cluster', 'treeLayout', 'treeSort', 'curve'],
  docs: ['repo/docs/marks/tree.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
