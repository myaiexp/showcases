// aframe example: Minecraft guide: spawn voxels on click from the intersection point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: spawn voxels on click from the intersection point',
  summary:
    'The guide\'s click handler creates an entity, gives it the voxel mixin and places it at the raycaster intersection point plus the face normal scaled by 0.25, snapped to the grid. Click the ground or a voxel to build.',
  section: 'Guides',
  tags: ['click', 'evt.detail.intersection', 'face.normal', 'createElement', 'appendChild', 'raycaster', 'cursor'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/components/cursor.md', 'repo/docs/components/raycaster.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
