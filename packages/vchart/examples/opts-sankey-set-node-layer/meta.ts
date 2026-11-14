// vchart example: Sankey setNodeLayer: choose each node's column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey setNodeLayer: choose each node's column",
  summary: "setNodeLayer receives a node datum and returns the column index to put it in, overriding the computed depth. Here Costs is pushed a column further right than its depth, and a select switches between the computed and the custom layers.",
  section: "Option: Series",
  tags: ["sankey.setNodeLayer","nodeAlign","nodeKey"],
  docs: [
    'repo/docs/assets/option/en/series/sankey.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
