// echarts example: Tree emphasis focus on ancestors and descendants
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tree emphasis focus on ancestors and descendants",
  summary:
    "Hover a node of the project tree and fade everything except its ancestors, its descendants or both, chosen with emphasis.focus. The preview highlights nodes in turn by dispatchAction.",
  section: 'Option: series.tree',
  tags: ['tree', 'emphasis.focus', 'ancestor', 'descendant', 'relative', 'blur', 'highlight'],
  docs: ['repo/en/option/series/tree.md', 'repo/en/option/partial/emphasis-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
