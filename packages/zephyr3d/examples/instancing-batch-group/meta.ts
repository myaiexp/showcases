// zephyr3d example: Static batching with a BatchGroup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Static batching with a BatchGroup',
  summary:
    'Thousands of rock instances parented to a BatchGroup: the group caches their batches, so the CPU no longer culls, sorts and packs each mesh every frame, and moving them updates the cache in place. Toggle the group off to compare CPU time per frame.',
  section: 'Geometry Instancing',
  tags: ['BatchGroup', 'static batching', 'createInstance', 'frameInfo.elapsedTimeCPU'],
  docs: ['repo/apps/doc/web/en/instancing-intro.md', 'repo/apps/doc/web/en/performance.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
