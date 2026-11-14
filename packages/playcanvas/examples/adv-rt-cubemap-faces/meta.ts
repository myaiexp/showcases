// playcanvas example: Render targets into cubemap faces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render targets into cubemap faces',
  summary:
    'Six cameras with 90 degree fields of view each render into one face of a single cubemap texture through a RenderTarget with the face option, and a mirror ball reflects the result live. The mirror sits in an excluded layer so it never reflects itself, and the full view rebuilds the cubemap at another size.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'face', 'RENDERTARGET_ORIGIN_TOP', 'cubemap', 'Layer', 'priority', 'cubeMap'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
