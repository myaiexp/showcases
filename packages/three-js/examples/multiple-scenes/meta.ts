// Three.js example: several scenes drawn by one renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Many scenes, one renderer',
  summary:
    'A single canvas sits behind three HTML boxes. Each frame the renderer reads each box\'s rectangle, sets the viewport and scissor to match, and draws that box\'s own scene and camera there. Drag inside a box to orbit it.',
  section: 'Solutions',
  tags: ['setViewport', 'setScissor', 'setScissorTest', 'OrbitControls', 'multiple scenes'],
  docs: ['repo/manual/pages/multiple-scenes.html', 'repo/docs/pages/Renderer.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
