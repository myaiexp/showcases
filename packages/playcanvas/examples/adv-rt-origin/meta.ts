// playcanvas example: Render target origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render target origin',
  summary:
    'The same feed rendered into two render targets and shown on two screens. The left target pins RENDERTARGET_ORIGIN_TOP and is upright on every graphics API; the right one takes TOP, BOTTOM or NATIVE, and the BOTTOM and (on WebGL 2) NATIVE choices come out vertically mirrored when sampled as a plain texture.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'origin', 'RENDERTARGET_ORIGIN_TOP', 'RENDERTARGET_ORIGIN_BOTTOM', 'RENDERTARGET_ORIGIN_NATIVE', 'emissiveMap'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
