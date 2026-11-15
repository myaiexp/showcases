// zephyr3d example: Node hierarchy: parents carry their children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node hierarchy: parents carry their children',
  summary:
    'Three spheres chained sphere1 > sphere2 > sphere3 with `parent =`; only the first two rotate, yet sphere3 traces a compound path. Buttons re-parent sphere3 to the scene root to show the difference.',
  section: 'Basic Framework',
  tags: ['SceneNode.parent', 'SceneNode.rotation', 'SceneNode.position', 'scene.rootNode', 'SphereShape'],
  docs: ['repo/apps/doc/web/en/scene-graph.md', 'repo/apps/doc/src/tut-8/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
