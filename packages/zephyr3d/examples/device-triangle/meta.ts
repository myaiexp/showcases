// zephyr3d example: A triangle on the raw device
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A triangle on the raw device',
  summary:
    'No Scene: buildRenderProgram turns a vertex and a fragment function into a shader, two vertex buffers and a vertex layout hold the data, a bind group carries the angle uniform, and device.draw submits the triangle from the tick handler.',
  section: 'Device API',
  tags: ['buildRenderProgram', 'createVertexBuffer', 'createVertexLayout', 'createBindGroup', 'setVertexLayout', 'setProgram', 'setBindGroup', 'draw', 'clearFrameBuffer'],
  docs: ['repo/apps/doc/web/en/devicesamples.md', 'repo/apps/doc/web/en/device.md', 'repo/apps/doc/web/en/buffer.md', 'repo/apps/doc/web/en/drawcall.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
