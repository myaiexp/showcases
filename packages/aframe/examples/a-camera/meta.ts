// aframe example: <a-camera> in a rig, with its mapped attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-camera> in a rig, with its mapped attributes',
  summary:
    '<a-camera> is a camera with look-controls and wasd-controls attached. Inside a rig entity, moving or turning the rig moves the view while the camera keeps its own controls, as the docs advise. In the full view, fov, the rig height and the look, WASD and reverse-drag attributes are live.',
  section: 'Primitives',
  tags: ['a-camera', 'fov', 'near', 'far', 'look-controls-enabled', 'wasd-controls-enabled', 'reverse-mouse-drag', 'camera rig'],
  docs: ['repo/docs/primitives/a-camera.md', 'repo/docs/components/camera.md', 'repo/docs/components/animation.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
