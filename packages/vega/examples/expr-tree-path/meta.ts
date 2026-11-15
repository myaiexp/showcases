// vega example: Expressions: treePath and treeAncestors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: treePath and treeAncestors",
  summary:
    "A 14-node tree where hovering a node makes it the target: treePath lights the route from a chosen source up to their common ancestor and down again, or treeAncestors lights the way to the root.",
  section: 'Expressions',
  tags: ["expression.treePath","expression.treeAncestors","transform.stratify","transform.tree"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/stratify.md","repo/docs/docs/transforms/tree.md","repo/docs/docs/transforms/treelinks.md","repo/docs/docs/transforms/linkpath.md","repo/docs/docs/transforms/tree.vg.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
