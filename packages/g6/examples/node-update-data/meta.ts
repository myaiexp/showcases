// g6 example: Node updates: updateNodeData and setElementState
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node updates: updateNodeData and setElementState",
  summary:
    "updateNodeData changes only the listed style keys of node-1 (fill and size) and setElementState selects node-2; draw applies both.",
  section: 'Node',
  tags: ['updateNodeData', 'draw', 'setElementState', 'partial update'],
  docs: ['repo/packages/site/docs/manual/element/node/overview.en.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
