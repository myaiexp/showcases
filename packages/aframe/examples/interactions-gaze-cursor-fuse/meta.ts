// aframe example: Gaze interaction: a fuse cursor child of the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gaze interaction: a fuse cursor child of the camera',
  summary:
    'A cursor with fuse: true sits under the camera. Looking at a shape starts the fusing event and after the fuse timeout a click, which a small cycle-color component turns into a colour change. Drag to look in the full view; cards turn the camera for you.',
  section: 'Introduction',
  tags: ['cursor', 'fuse', 'fuseTimeout', 'raycaster', 'fusing', 'click', 'a-camera'],
  docs: ['repo/docs/introduction/interactions-and-controllers.md', 'repo/docs/components/cursor.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
