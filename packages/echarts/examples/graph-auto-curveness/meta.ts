// echarts example: Graph auto curveness for parallel edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph auto curveness for parallel edges",
  summary:
    "Several edges between the same pair of nodes would overlap into one line. Switch autoCurveness between off, true, a number and an explicit curveness array, and change how many parallel edges there are.",
  section: 'Option: series.graph',
  tags: ['graph', 'autoCurveness', 'lineStyle.curveness', 'links', 'edgeSymbol', 'preserveAspect'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/line-style.md', 'repo/en/option/partial/view-coord-sys.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
