// playcanvas example: Camera before passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera before passes',
  summary:
    'A RenderPassShaderQuad pushed into camera.beforePasses paints an animated plasma into a texture every frame, after the shadow maps and before the scene, so materials sampling that texture always see the current frame. The full view disables the pass, which freezes the texture, and changes the pattern.',
  section: 'Graphics: Advanced Rendering',
  tags: ['beforePasses', 'RenderPassShaderQuad', 'ShaderUtils', 'enabled', 'RenderTarget', 'FramePass'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/camera-passes.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/frame-passes.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
