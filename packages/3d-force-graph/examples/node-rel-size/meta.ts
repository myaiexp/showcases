// 3d-force-graph example: Node styling: nodeRelSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeRelSize',
  summary:
    'nodeRelSize is the sphere volume per unit of nodeVal, so it scales every node at once while the values keep their proportions. Drag the slider and the spheres grow; the layout does not change.',
  section: 'Node styling',
  tags: ['nodeRelSize', 'nodeVal'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
