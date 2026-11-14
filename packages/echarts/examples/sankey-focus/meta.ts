// echarts example: Sankey: nodes, links and focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: nodes, links and focus",
  summary:
    "A sankey of energy flows with orient and emphasis.focus. Nodes are highlighted in turn by dispatchAction.",
  section: 'Option: series.sankey',
  tags: ['sankey', 'orient', 'emphasis.focus', 'adjacency', 'nodes', 'links', 'highlight'],
  docs: ['repo/en/option/series/sankey.md', 'repo/en/api/action.md', 'repo/en/option/partial/emphasis-common.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
