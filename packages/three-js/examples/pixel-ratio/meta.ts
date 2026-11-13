// Three.js example: drawing-buffer size and pixel ratio, blocky versus crisp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resolution and pixel ratio',
  summary:
    'renderer.setPixelRatio scales the drawing buffer relative to the canvas size in CSS pixels. Drag it down to see the buffer shrink and the image go blocky, up to see it sharpen.',
  section: 'Basics',
  tags: ['setPixelRatio', 'setSize', 'devicePixelRatio', 'drawing buffer', 'resize'],
  docs: [
    'repo/manual/pages/responsive.html',
    'repo/docs/pages/Renderer.html.md',
    'repo/docs/pages/TorusKnotGeometry.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
