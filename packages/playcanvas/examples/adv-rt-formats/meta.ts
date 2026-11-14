// playcanvas example: Render target colour formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render target colour formats',
  summary:
    'The colour texture of a render target must use a renderable format. A bar emissive at 4.0 is rendered into RGBA8, SRGBA8, RGB10A2, and the half and full float formats the device can render to; a ShaderMaterial screen shows the result divided by a range and tints values above 1, so only the float formats keep the brightness.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderTarget', 'PIXELFORMAT_RGBA8', 'PIXELFORMAT_SRGBA8', 'PIXELFORMAT_RGB10A2', 'PIXELFORMAT_RGBA16F', 'PIXELFORMAT_RGBA32F', 'textureHalfFloatRenderable', 'textureFloatRenderable'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/render-targets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
