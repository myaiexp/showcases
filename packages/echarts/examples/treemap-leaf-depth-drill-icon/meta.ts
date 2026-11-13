// echarts example: Treemap leafDepth drill down and breadcrumb
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap leafDepth drill down and breadcrumb",
  summary:
    "A treemap that only shows leafDepth levels at a time, with drillDownIcon marking nodes that can be opened and a styled breadcrumb to climb back. Choose how many levels are shown and what the icon looks like.",
  section: 'Option: series.treemap',
  tags: ['treemap', 'leafDepth', 'drillDownIcon', 'breadcrumb', 'breadcrumb.itemStyle', 'treemapRootToNode', 'upperLabel'],
  docs: ['repo/en/option/series/treemap.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
