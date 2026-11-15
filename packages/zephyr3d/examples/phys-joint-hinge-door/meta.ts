// zephyr3d example: Hinge joint: a door with limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hinge joint: a door with limits',
  summary:
    'The joint sits on its own child node of the door: that node\'s origin is the pivot and its Y axis the hinge axis. Limits of ±110° stop the swing, joint.angle is read live, and balls knock the door open.',
  section: 'Physics',
  tags: ['Joint', 'hinge', 'limitsEnabled', 'lowerLimit', 'upperLimit', 'angle'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
