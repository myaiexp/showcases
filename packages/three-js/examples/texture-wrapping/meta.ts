// Three.js example: texture wrapS/wrapT, repeat, offset, rotation and center on a drawn texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeat, offset and rotation',
  summary:
    'A checker-and-arrow pattern drawn on a 2D canvas becomes a CanvasTexture; sliders drive its wrapS/wrapT mode, repeat, offset, rotation and centre of rotation on a plane.',
  section: 'Fundamentals',
  tags: ['CanvasTexture', 'wrapS', 'wrapT', 'repeat', 'offset', 'rotation', 'center'],
  docs: [
    'repo/manual/pages/textures.html',
    'repo/docs/pages/Texture.html.md',
    'repo/docs/pages/CanvasTexture.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
