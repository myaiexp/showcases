// playcanvas example: Static batch group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Static batch group',
  summary:
    'BatchManager.addGroup() makes a static group, and entities whose render components share its batchGroupId and one material merge into a few draw calls. The full view reads app.stats.drawCallCount, shrinks maxAabbSize to split the merge into more batches, and shows that moved entities only follow after markGroupDirty().',
  section: 'Graphics: Advanced Rendering',
  tags: ['BatchManager', 'addGroup', 'removeGroup', 'markGroupDirty', 'batchGroupId', 'maxAabbSize', 'stats'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/batching.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
