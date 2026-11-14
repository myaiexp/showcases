// playcanvas example: Camera frame passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera frame passes',
  summary:
    'CameraComponent.framePasses replaces the default rendering: a RenderPassForward draws the World layer into a texture that it resizes to the back buffer every frame, and a RenderPassShaderQuad subclass draws that texture to the screen, tinted with a vignette. Setting framePasses to null brings the default rendering back; the full view also scales the scene resolution.',
  section: 'Graphics: Advanced Rendering',
  tags: ['framePasses', 'RenderPassForward', 'RenderPassShaderQuad', 'ShaderUtils', 'addLayer', 'RenderTarget', 'init', 'scaleX'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/camera-passes.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-forward.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
