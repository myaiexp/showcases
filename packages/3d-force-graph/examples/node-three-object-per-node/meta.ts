// 3d-force-graph example: Node styling: custom object for some nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: custom object for some nodes',
  summary:
    'When nodeThreeObject returns a falsy value the default sphere is used for that node. Here only the hubs, the nodes with four or more links, get a glowing octahedron; everyone else stays a plain sphere.',
  section: 'Node styling',
  tags: ['nodeThreeObject', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
