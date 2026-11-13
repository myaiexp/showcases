// Three.js example: a RenderTarget's texture used as a material map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rendering to a texture',
  summary:
    'One scene of spinning cubes is rendered into a RenderTarget with setRenderTarget, and that texture is mapped onto the cubes of a second scene drawn to the canvas. Resize the target to see the texture resolution change.',
  section: 'Fundamentals',
  tags: ['RenderTarget', 'setRenderTarget', 'texture', 'multiple scenes'],
  docs: [
    'repo/manual/pages/rendertargets.html',
    'repo/docs/pages/RenderTarget.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
