// playcanvas example: Hardware instancing, default format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hardware instancing, default format',
  summary:
    'A Float32Array of 1500 Mat4 matrices becomes a VertexBuffer in the default instancing format, and setInstancing() on a render component\'s mesh instance draws them all in one call. The entity\'s own transform multiplies every instance matrix; the full view changes instancingCount and the spin.',
  section: 'Graphics: Advanced Rendering',
  tags: ['setInstancing', 'instancingCount', 'VertexBuffer', 'VertexFormat', 'getDefaultInstancingFormat', 'Mat4', 'setTRS'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
