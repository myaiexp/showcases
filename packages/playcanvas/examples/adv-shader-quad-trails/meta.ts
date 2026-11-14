// playcanvas example: Shader quad light trails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader quad light trails',
  summary:
    'Two RenderPassShaderQuad passes paint into one texture that is never cleared: a fade pass subtracts a constant with a reverse-subtract BlendState, and a brush pass draws a soft dot for each brush, setting the viewport and colour of each one inside an overridden execute with additive blending.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderPassShaderQuad', 'BlendState', 'BLENDEQUATION_REVERSE_SUBTRACT', 'viewport', 'execute', 'render', 'ShaderUtils'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
