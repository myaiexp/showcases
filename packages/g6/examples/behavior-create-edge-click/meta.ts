// g6 example: Create edge: click twice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Create edge: click twice',
  summary: "create-edge with trigger: 'click' starts an edge at the first clicked node and finishes it at the second; clicking the canvas cancels. The card clicks pairs of nodes.",
  section: 'Behavior',
  tags: ['create-edge', 'trigger', 'click'],
  docs: ['repo/packages/site/docs/manual/behavior/CreateEdge.en.md', 'repo/packages/site/common/api/behaviors/create-edge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
