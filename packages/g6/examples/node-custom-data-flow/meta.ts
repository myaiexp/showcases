// g6 example: Custom node: reading data in render()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom node: reading data in render()",
  summary:
    "A custom node that reads the same data as style attributes (mapped by node.style functions) and through context.graph.getNodeData; the full view shows both.",
  section: 'Node',
  tags: ['register', 'attributes', 'context.graph', 'getNodeData', 'upsert'],
  docs: ['repo/packages/site/docs/manual/element/node/custom-node.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
