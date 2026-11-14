// g6 example: Create edge: drag between nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Create edge: drag between nodes',
  summary: "create-edge with trigger: 'drag' draws an edge that follows the pointer from the pressed node and joins the node it is released on. The card drags between nodes and clears the edges now and then.",
  section: 'Behavior',
  tags: ['create-edge', 'trigger', 'drag', 'onFinish', 'removeEdgeData'],
  docs: ['repo/packages/site/docs/manual/behavior/CreateEdge.en.md', 'repo/packages/site/common/api/behaviors/create-edge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
