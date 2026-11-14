// playcanvas example: Transform feedback particles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transform feedback particles',
  summary:
    'A vertex shader moves 60000 particles each frame and captures its out_ varying into the output buffer. TransformFeedback.createShader() builds the shader, process() runs it with rasterisation off and swaps the buffers, and the same buffer is drawn as additive points. WebGL 2 only: WebGPU gets a notice.',
  section: 'Graphics: Advanced Rendering',
  tags: ['TransformFeedback', 'createShader', 'process', 'BUFFER_GPUDYNAMIC', 'VertexBuffer', 'PRIMITIVE_POINTS', 'BlendState'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/transform-feedback.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
