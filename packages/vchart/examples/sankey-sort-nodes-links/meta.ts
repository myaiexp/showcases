// vchart example: Sankey: nodeSortBy and linkSortBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: nodeSortBy and linkSortBy",
  summary:
    "nodeSortBy and linkSortBy take comparison functions that order the nodes inside a column and the links leaving a node. The select compares the layout's own order with sorting by value ascending, descending or by name.",
  section: "Flow and Relation",
  tags: ["nodeSortBy", "linkSortBy", "iterations"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
