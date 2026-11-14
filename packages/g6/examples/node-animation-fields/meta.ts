// g6 example: Node animation: custom update fields and easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node animation: custom update fields and easing",
  summary:
    "An update animation written as an object: only x and y are tweened, with a chosen duration and easing, while fill changes at once.",
  section: 'Node',
  tags: ['node.animation', 'update', 'fields', 'duration', 'easing'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
