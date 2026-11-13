// echarts example: Sankey explicit depth and per-link styling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey explicit depth and per-link styling",
  summary:
    "Override what the layout decides: data.depth pushes a node into a chosen column, and individual links and nodes carry their own lineStyle, itemStyle and label. Toggle each override to see what it changes.",
  section: 'Option: series.sankey',
  tags: ['sankey', 'data.depth', 'data.itemStyle', 'data.label', 'links.lineStyle', 'links.emphasis', 'data.value'],
  docs: ['repo/en/option/series/sankey.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/item-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
