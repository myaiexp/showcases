// Three.js example: a CanvasTexture redrawn every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic canvas textures',
  summary:
    'A 2D canvas with bouncing, trailing dots is wrapped in a CanvasTexture on a spinning cube. Setting needsUpdate each frame re-uploads it; a checkbox turns that off so you can see why it matters.',
  section: 'Solutions',
  tags: ['CanvasTexture', 'needsUpdate', 'Canvas 2D'],
  docs: ['repo/manual/pages/canvas-textures.html', 'repo/docs/pages/CanvasTexture.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
