// playcanvas example: Device loss and recovery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Device loss and recovery',
  summary:
    'Stamps painted into a render target with RenderPassShaderQuad are GPU-only history that a lost context does not bring back. The full view loses the WebGL context for a moment through WEBGL_lose_context, logs the devicelost and devicerestored events, and either replays the painting from the stamp list kept in JavaScript or leaves it blank. The card only paints.',
  section: 'Graphics: Advanced Rendering',
  tags: ['devicelost', 'devicerestored', 'RenderTarget', 'RenderPassShaderQuad', 'ShaderUtils', 'isContextLost'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/device-loss.md', 'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
