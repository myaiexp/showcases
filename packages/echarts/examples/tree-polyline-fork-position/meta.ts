// echarts example: Tree polyline edges and fork position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tree polyline edges and fork position",
  summary:
    "A tree whose edges are right-angled polylines instead of curves. Slide edgeForkPosition to move the point where a parent's edge branches toward its children, and switch back to curve edges to compare.",
  section: 'Option: series.tree',
  tags: ['tree', 'edgeShape', 'polyline', 'edgeForkPosition', 'orient', 'lineStyle'],
  docs: ['repo/en/option/series/tree.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
