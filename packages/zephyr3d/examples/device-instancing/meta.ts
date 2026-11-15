// zephyr3d example: Instanced drawing with per-instance buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instanced drawing with per-instance buffers',
  summary:
    'A single cube mesh drawn 81 times with drawInstanced. Two extra vertex buffers use stepMode instance to give every cube its own offset, phase and colour; the shader reads them as ordinary vertex inputs.',
  section: 'Device API',
  tags: ['createVertexLayout', 'stepMode', 'drawInstanced', 'createVertexBuffer', 'createIndexBuffer', 'buildRenderProgram'],
  docs: ['repo/apps/doc/web/en/devicesamples.md', 'repo/apps/doc/web/en/drawcall.md', 'repo/apps/doc/web/en/buffer.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
