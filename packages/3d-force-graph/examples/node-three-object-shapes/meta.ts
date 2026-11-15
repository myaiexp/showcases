// 3d-force-graph example: Node styling: nodeThreeObject geometries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeThreeObject geometries',
  summary:
    'nodeThreeObject returns any three.js Object3D to draw a node instead of the sphere. Here each group gets its own mesh: box, cone, torus or dodecahedron, sized from the node value.',
  section: 'Node styling',
  tags: ['nodeThreeObject', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
