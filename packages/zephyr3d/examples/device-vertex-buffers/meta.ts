// zephyr3d example: Separate, interleaved and 32-bit buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Separate, interleaved and 32-bit buffers',
  summary:
    'The same cube built three ways: one vertex buffer per attribute, a single interleaved buffer made with createInterleavedVertexBuffer, and a Uint32 index buffer. The shader cannot tell them apart.',
  section: 'Device API',
  tags: ['createVertexBuffer', 'createInterleavedVertexBuffer', 'createIndexBuffer', 'createVertexLayout', 'support32BitIndex'],
  docs: ['repo/apps/doc/web/en/buffer.md', 'repo/apps/doc/web/en/drawcall.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
