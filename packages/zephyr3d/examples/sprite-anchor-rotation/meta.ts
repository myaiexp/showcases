// zephyr3d example: Sprite anchor, rotation and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sprite anchor, rotation and scale',
  summary:
    'A camera-facing Sprite with a generated marker texture. anchorX/anchorY move the pivot inside the quad (a red cube marks the node position), material.rotation spins it in its plane and the node scale sizes it.',
  section: 'Basic Framework',
  tags: ['Sprite', 'StandardSpriteMaterial', 'anchorX', 'anchorY', 'material.rotation', 'spriteTexture'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
