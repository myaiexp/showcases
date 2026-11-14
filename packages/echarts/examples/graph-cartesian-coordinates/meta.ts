// echarts example: Graph on cartesian axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph on cartesian axes",
  summary:
    "A graph series with coordinateSystem cartesian2d: nodes sit at their [x, y] value on a grid with axes, and links join them. Reshuffle the positions, change curveness or hide the links.",
  section: 'Option: series.graph',
  tags: ['graph', 'coordinateSystem', 'cartesian2d', 'xAxis', 'yAxis', 'lineStyle.curveness'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/coord-sys.md', 'repo/en/option/partial/line-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
