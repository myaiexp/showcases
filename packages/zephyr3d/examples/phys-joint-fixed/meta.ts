// zephyr3d example: Fixed joint: welding two bodies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fixed joint: welding two bodies',
  summary:
    'A fixed joint welds two bodies in the pose they had when it was made, so the left pair tumbles as one while the identical right pair falls apart. Setting node.physics.joint = null breaks the weld.',
  section: 'Physics',
  tags: ['Joint', 'fixed', 'connectedBody', 'physics.joint'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
