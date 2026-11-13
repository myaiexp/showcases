// echarts example: Graph edge arrows and edge labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph edge arrows and edge labels",
  summary:
    "A service map with fixed node positions. Choose the symbols at the two ends of each edge, their size, and where the edge label (the request rate) sits along the edge.",
  section: 'Option: series.graph',
  tags: ['graph', 'edgeSymbol', 'edgeSymbolSize', 'edgeLabel', 'edgeLabel.position', 'links.lineStyle'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/line-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
