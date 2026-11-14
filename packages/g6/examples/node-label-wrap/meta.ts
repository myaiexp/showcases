// g6 example: Node label: word wrap and overflow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node label: word wrap and overflow",
  summary:
    "A long label wrapped with labelWordWrap, limited by labelMaxWidth and labelMaxLines, and cut with an ellipsis through labelTextOverflow.",
  section: 'Node',
  tags: ['labelWordWrap', 'labelMaxWidth', 'labelMaxLines', 'labelTextOverflow', 'labelTextAlign'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
