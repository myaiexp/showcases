// echarts example: Tree leaves styling and collapsed nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tree leaves styling and collapsed nodes",
  summary:
    "A tree with its own look for leaf nodes (series.leaves), nodes folded at start through data.collapsed, and a choice of node symbol. Note how the default emptyCircle shows folded subtrees and solid symbols do not.",
  section: 'Option: series.tree',
  tags: ['tree', 'leaves', 'leaves.label', 'leaves.itemStyle', 'data.collapsed', 'symbol', 'itemStyle', 'expandAndCollapse'],
  docs: ['repo/en/option/series/tree.md', 'repo/en/option/partial/symbol.md', 'repo/en/option/partial/item-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
