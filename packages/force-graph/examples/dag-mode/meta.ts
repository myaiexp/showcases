// force-graph example: Force engine: dagMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: dagMode',
  summary:
    'dagMode lays a graph without cycles out by depth: top-down, bottom-up, left-to-right, right-to-left, or in rings going outward or inward. The card steps through the six modes.',
  section: 'Force engine configuration',
  tags: ['dagMode', 'linkDirectionalArrowLength', 'layeredDag'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
