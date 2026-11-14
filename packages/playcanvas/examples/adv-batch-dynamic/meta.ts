// playcanvas example: Dynamic batch group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic batch group',
  summary:
    'A group created with dynamic = true keeps its merged mesh instances movable: 180 orbiting capsules share one material and one batch group, and each frame\'s transforms are applied on the GPU. The full view switches batching off to compare the draw call count from app.stats.drawCallCount.',
  section: 'Graphics: Advanced Rendering',
  tags: ['BatchManager', 'addGroup', 'removeGroup', 'batchGroupId', 'dynamic', 'stats'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/batching.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
