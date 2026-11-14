// echarts example: Graph circular layout and rotated labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph circular layout and rotated labels",
  summary:
    "A graph series laid out on a circle with layout circular. Toggle circular.rotateLabel so labels follow the radius, and move the label position or node size.",
  section: 'Option: series.graph',
  tags: ['graph', 'layout', 'circular', 'rotateLabel', 'label.position', 'symbolSize'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/symbol.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
