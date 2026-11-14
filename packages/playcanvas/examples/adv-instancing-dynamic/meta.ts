// playcanvas example: Dynamic instancing buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic instancing buffer',
  summary:
    'A VertexBuffer created with usage BUFFER_DYNAMIC and no data holds 1024 matrices that the update loop recomputes and uploads with setData() every frame, so a grid of boxes ripples as a wave while it stays a single instanced draw.',
  section: 'Graphics: Advanced Rendering',
  tags: ['BUFFER_DYNAMIC', 'VertexBuffer', 'setData', 'setInstancing', 'getDefaultInstancingFormat'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
