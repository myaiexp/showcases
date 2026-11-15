// zephyr3d example: lodDistanceScale: coarser levels sooner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'lodDistanceScale: coarser levels sooner',
  summary:
    'Rows of tori whose shape generates levels of detail. camera.lodDistanceScale scales the distances at which levels switch: at 2 or 4 each mesh drops to a coarser level sooner, the docs\' setting for low-end devices. LOD coloration shows each mesh\'s level.',
  section: 'Performance',
  tags: ['lodDistanceScale', 'TorusShape lod', 'lodColoration', 'levels of detail'],
  docs: ['repo/apps/doc/web/en/performance.md', 'repo/apps/doc/web/en/mesh-lod.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
