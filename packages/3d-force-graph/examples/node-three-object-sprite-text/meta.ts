// 3d-force-graph example: Node styling: text sprites
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: text sprites',
  summary:
    'A THREE.Sprite always faces the camera, so a sprite textured with a canvas drawing makes a text node. nodeThreeObject draws the name onto a canvas in code and wraps it in a SpriteMaterial; no image files are involved.',
  section: 'Node styling',
  tags: ['nodeThreeObject', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
