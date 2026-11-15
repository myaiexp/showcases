// zephyr3d example: Node transform: position, rotation, scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node transform: position, rotation, scale',
  summary:
    'A sphere with a Blinn material, a generated colour map and a linear normal map. Every frame its rotation (a Quaternion from fromAxisAngle) and position.y change; the scale slider sets scale.',
  section: 'Basic Framework',
  tags: ['SceneNode.position', 'SceneNode.rotation', 'SceneNode.scale', 'Quaternion.fromAxisAngle', 'BlinnMaterial', 'fetchTexture'],
  docs: ['repo/apps/doc/web/en/scene-graph.md', 'repo/apps/doc/src/tut-7/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
