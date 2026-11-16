// aframe example: Minecraft guide: a voxel mixin like a prefab
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minecraft guide: a voxel mixin like a prefab',
  summary:
    'An <a-mixin id="voxel"> in <a-assets> bundles geometry, material, random-color and snap; four entities become voxels with mixin="voxel" and a position, one of them also animated.',
  section: 'Guides',
  tags: ['a-mixin', 'mixin', 'a-assets', 'random-color', 'snap'],
  docs: ['repo/docs/guides/building-a-minecraft-demo.md', 'repo/docs/core/mixins.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
