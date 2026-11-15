// zephyr3d example: Primitive topologies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitive topologies',
  summary:
    'Nine vertices, six ways to read them: point-list, line-list, line-strip, triangle-list, triangle-strip and triangle-fan. The shader sets the point size with the pointSize builtin, which is a WebGL feature.',
  section: 'Device API',
  tags: ['draw', 'PrimitiveType', 'point-list', 'triangle-fan', 'pointSize', 'vertexIndex', 'drawText'],
  docs: ['repo/apps/doc/web/en/drawcall.md', 'repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
