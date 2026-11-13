// echarts example: Graph force gravity, friction and edge length ranges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graph force gravity, friction and edge length ranges",
  summary:
    "The parts of the force layout the first graph example leaves alone: gravity toward the centre, friction, an edgeLength range driven by link values, a circular initLayout and a pinned node. Each change restarts the simulation.",
  section: 'Option: series.graph',
  tags: ['graph', 'layout', 'force', 'force.gravity', 'force.friction', 'force.edgeLength', 'force.initLayout', 'data.fixed'],
  docs: ['repo/en/option/series/graph.md', 'repo/en/option/partial/view-coord-sys.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
