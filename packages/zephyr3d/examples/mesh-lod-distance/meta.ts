// zephyr3d example: Camera.lodDistanceScale as a quality setting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera.lodDistanceScale as a quality setting',
  summary:
    'Six tori with generated levels of detail in a row. camera.lodDistanceScale scales every switch size at once: above 1 meshes drop to simpler levels sooner, below 1 they stay detailed farther away. The readout shows each mesh\'s level.',
  section: 'Basic Framework',
  tags: ['Camera.lodDistanceScale', 'TorusShape lod', 'Mesh.selectLod'],
  docs: ['repo/apps/doc/web/en/mesh-lod.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
