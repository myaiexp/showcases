// playcanvas example: Instanced shader quads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instanced shader quads',
  summary:
    'Setting numInstances on a RenderPassShaderQuad draws many quads in a single instanced draw. A custom vertex shader reads gl_InstanceID to place, size and colour each quad along a spiral of soft additive dots; the full view changes the count, and zero draws nothing while the pass still clears.',
  section: 'Graphics: Advanced Rendering',
  tags: ['RenderPassShaderQuad', 'numInstances', 'gl_InstanceID', 'ShaderUtils', 'BlendState', 'setClearColor'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/frame-graph/render-pass-shader-quad.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
