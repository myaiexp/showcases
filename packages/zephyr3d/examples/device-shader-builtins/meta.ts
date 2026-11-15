// zephyr3d example: Builtin shader variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Builtin shader variables',
  summary:
    'Five quads drawn with one drawInstanced call. The vertex shader reads instanceIndex and vertexIndex, the fragment shader reads fragCoord for diagonal stripes and frontFacing to tint the back of each spinning quad.',
  section: 'Device API',
  tags: ['$builtins', 'vertexIndex', 'instanceIndex', 'fragCoord', 'frontFacing', 'drawInstanced'],
  docs: ['repo/apps/doc/web/en/shader.md', 'repo/apps/doc/web/en/drawcall.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
