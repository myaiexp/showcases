// playcanvas example: Instanced forest without entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instanced forest without entities',
  summary:
    'One MeshInstance with a GraphNode at identity draws up to 2000 cones through a single instancing VertexBuffer of world matrices. setInstancing(buffer, true) culls the group as a whole against a custom AABB, instancingCount draws a prefix of the buffer without reallocating it, and the instance leaves and re-enters its layer intact.',
  section: 'Graphics: Advanced Rendering',
  tags: ['MeshInstance', 'setInstancing', 'instancingCount', 'setCustomAabb', 'VertexBuffer', 'VertexFormat', 'getDefaultInstancingFormat'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/rendering-without-entities.md', 'repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
