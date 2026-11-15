// tanstack-charts example: Drill down with rootId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Drill down with rootId",
  summary:
    "rootId makes a node the new center and its children the first ring, and visibleDepth keeps two rings visible. The definition is rebuilt with each root and mounted with the motion() renderer, so sectors unfold from or collapse into their nearest ancestor.",
  section: "Sunburst Mark",
  tags: ['sunburst', 'rootId', 'visibleDepth', 'motion', 'mountChartRenderer'],
  docs: ['repo/docs/reference/marks/sunburst.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
