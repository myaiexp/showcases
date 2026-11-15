// tanstack-charts example: treeLayout from id and parentId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "treeLayout from id and parentId",
  summary:
    "When every node is its own row, treeLayout takes id and parentId instead of path. The tree is laid out from an org chart, and sort puts the children in alphabetical order instead of input order. The readout shows the node fields it adds.",
  section: "Data Transforms",
  tags: ["treeLayout", "id", "parentId", "sort", "separation"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
