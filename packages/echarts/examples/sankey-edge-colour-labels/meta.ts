// echarts example: Sankey edge colours, curveness and edge labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey edge colours, curveness and edge labels",
  summary:
    "How the ribbons of a sankey look: lineStyle.color taking the source node, the target node, a gradient between them or one fixed colour, plus curveness, opacity and a label on every edge showing its value.",
  section: 'Option: series.sankey',
  tags: ['sankey', 'lineStyle.color', 'lineStyle.curveness', 'lineStyle.opacity', 'edgeLabel', 'itemStyle.borderRadius'],
  docs: ['repo/en/option/series/sankey.md', 'repo/en/option/partial/label.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
