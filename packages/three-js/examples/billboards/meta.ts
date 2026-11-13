// Three.js example: Sprite name badges that face the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sprites that face the camera',
  summary:
    'Name badges drawn on canvases become Sprites that always turn toward the camera while you orbit, next to the same badges as fixed planes for contrast. SpriteMaterial.rotation spins them in place.',
  section: 'Solutions',
  tags: ['Sprite', 'SpriteMaterial', 'CanvasTexture', 'OrbitControls'],
  docs: [
    'repo/manual/pages/billboards.html',
    'repo/docs/pages/Sprite.html.md',
    'repo/docs/pages/SpriteMaterial.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
