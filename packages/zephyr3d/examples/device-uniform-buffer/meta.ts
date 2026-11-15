// zephyr3d example: A uniform buffer and bufferSubData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A uniform buffer and bufferSubData',
  summary:
    'A palette of sixteen vec4 declared with uniformBuffer in the shader. createStructuredBuffer builds the buffer from the program\'s binding info and bufferSubData rewrites one slot at a time.',
  section: 'Device API',
  tags: ['uniformBuffer', 'getBindingInfo', 'createStructuredBuffer', 'bufferSubData', 'setBuffer'],
  docs: ['repo/apps/doc/web/en/buffer.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
