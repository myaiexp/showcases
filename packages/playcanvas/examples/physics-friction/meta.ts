// playcanvas example: Friction and rolling friction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Friction and rolling friction',
  summary:
    'A ramp with six bodies on it. Three boxes with friction 0.05, 0.4 and 0.9 either slide away or grip as the ramp tilts, and three spheres with rollingFriction 0, 0.1 and 0.5 roll off the ramp and onto the floor, where only the rolling friction brings them to rest. The ramp is a static body repositioned with teleport.',
  section: 'Physics',
  tags: ['friction', 'rollingFriction', 'teleport', 'rigidbody'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
