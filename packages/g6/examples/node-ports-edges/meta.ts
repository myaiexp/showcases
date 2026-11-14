// g6 example: Node ports: edges attached to named ports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Node ports: edges attached to named ports",
  summary:
    "Edges join keyed ports on rect nodes through sourcePort and targetPort, crossed on purpose. linkToCenter moves the edge end from the port rim to its centre.",
  section: 'Node',
  tags: ['ports', 'key', 'sourcePort', 'targetPort', 'linkToCenter', 'r'],
  docs: ['repo/packages/site/docs/manual/element/node/BaseNode.en.md', 'repo/packages/site/common/api/elements/nodes/base-node.md', 'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
