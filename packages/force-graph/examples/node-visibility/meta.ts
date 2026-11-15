// force-graph example: Node styling: nodeVisibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeVisibility',
  summary:
    'nodeVisibility says per node whether to draw it. A hidden node is still in the simulation and still has links: the links keep pulling and keep being drawn, so they run off into empty space.',
  section: 'Node styling',
  tags: ['nodeVisibility', 'nodeColor', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
