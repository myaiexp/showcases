// zephyr3d example: An indexed cube with depth testing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An indexed cube with depth testing',
  summary:
    'A cube from three vertex buffers and a Uint16 index buffer, lit by a program with mvp, model and colour uniforms. device.draw takes a first index and a count, so a slider can build the cube face by face.',
  section: 'Device API',
  tags: ['createIndexBuffer', 'createVertexBuffer', 'createVertexLayout', 'draw', 'setBindGroup', 'clearFrameBuffer', 'DEPTH_CLEAR_VALUE'],
  docs: ['repo/apps/doc/web/en/devicesamples.md', 'repo/apps/doc/web/en/buffer.md', 'repo/apps/doc/web/en/drawcall.md', 'repo/apps/doc/web/en/renderstate.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
