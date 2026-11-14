// echarts example: Graph categories with a legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph categories with a legend",
  summary:
    "Nodes grouped by series.categories, each with its own symbol, colour and label, and a legend that hides a whole category. Pick the symbol of the first category or turn category labels off.",
  section: 'Option: series.graph',
  tags: ['graph', 'categories', 'data.category', 'legend', 'symbol', 'categories.label'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/symbol.md', 'repo/en/option/partial/label.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
