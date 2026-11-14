// g6 example: Node animation: enter, update and exit stages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node animation: enter, update and exit stages",
  summary:
    "Nodes fade in, translate when moved and fade out when removed, per node.animation. Selects switch a stage off with false; buttons add, move and remove nodes.",
  section: 'Node',
  tags: ['node.animation', 'enter', 'update', 'exit', 'fade', 'translate', 'addNodeData', 'removeNodeData'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md', 'repo/packages/site/docs/api/data.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
