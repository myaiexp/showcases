// zephyr3d example: A grid mesh rewritten every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A grid mesh rewritten every frame',
  summary:
    'An indexed grid filled by hand with position_f32x3, normal_f32x3 and diffuse_u8normx4 buffers, shaded by a LambertMaterial with vertexColor on. The data is rewritten each frame; setBoundingVolume gives it culling bounds and invalidateBoundingVolume() refreshes them when the amplitude changes.',
  section: 'Basic Framework',
  tags: ['Primitive', 'createVertexBuffer', 'bufferSubData', 'invalidateBoundingVolume', 'vertexColor', 'LambertMaterial'],
  docs: ['repo/apps/doc/web/en/mesh-material.md', 'repo/apps/doc/web/en/scene-graph.md', 'repo/apps/doc/src/tut-9/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
