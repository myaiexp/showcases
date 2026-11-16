// aframe example: Guide: the default look and WASD controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: the default look and WASD controls',
  summary:
    'Without a camera in the markup A-Frame adds one with look-controls and wasd-controls. Drag to look and press W A S D to move; the readout shows the camera entity\'s position and rotation as they change.',
  section: 'Guides',
  tags: ['look-controls', 'wasd-controls', 'default camera', 'object3D'],
  docs: ['repo/docs/guides/building-a-basic-scene.md', 'repo/docs/components/look-controls.md', 'repo/docs/components/wasd-controls.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
