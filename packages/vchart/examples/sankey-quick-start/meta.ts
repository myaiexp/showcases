// vchart example: Sankey: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: quick start",
  summary:
    "A Sankey from nested data: each node's children become the next column and the child values set the link widths. nodeKey names the nodes, and updateData re-splits the budget every two seconds so the links reshape.",
  section: "Flow and Relation",
  tags: ["sankey", "nodes", "children", "nodeKey", "categoryField", "valueField"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
