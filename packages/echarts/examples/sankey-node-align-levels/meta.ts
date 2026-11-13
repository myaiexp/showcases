// echarts example: Sankey nodeAlign and per-depth levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey nodeAlign and per-depth levels",
  summary:
    "A budget flow where some branches end earlier than others. Choose nodeAlign to see where those nodes land, size the nodes with nodeWidth and nodeGap, and keep the data order with layoutIterations 0. Each depth has its own colours through levels.",
  section: 'Option: series.sankey',
  tags: ['sankey', 'nodeAlign', 'nodeWidth', 'nodeGap', 'layoutIterations', 'levels', 'levels.depth', 'draggable'],
  docs: ['repo/en/option/series/sankey.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
