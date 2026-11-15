// 3d-force-graph example: Node styling: nodeResolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeResolution',
  summary:
    'nodeResolution is how many segments divide a sphere circumference: the default 8 is visibly faceted up close, higher values are smooth, and very low ones turn the sphere into a polyhedron. Large spheres and a close camera make the steps easy to see.',
  section: 'Node styling',
  tags: ['nodeResolution', 'nodeVal', 'nodeOpacity'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
