// playcanvas example: Shader quads into atlas tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader quads into atlas tiles',
  summary:
    'One RenderPassShaderQuad is reused to draw four shaders into the four tiles of a texture atlas by setting its viewport, with an alpha-blended badge drawn over the first tile and the fourth tile drawn immediately with drawQuadWithShader. Nothing clears the atlas, so a tile that is not redrawn (the full view can freeze each) keeps its last image.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderPassShaderQuad', 'viewport', 'blendState', 'BlendState', 'drawQuadWithShader', 'ShaderUtils', 'render'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
