// g6 example: Node state: selected, highlight and a custom state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node state: selected, highlight and a custom state",
  summary:
    "node.state defines style overrides per state name; setElementState applies one or several states to a node at once, built-in or custom.",
  section: 'Node',
  tags: ['node.state', 'setElementState', 'selected', 'highlight', 'custom state'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md', 'repo/packages/site/docs/manual/element/node/overview.en.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
