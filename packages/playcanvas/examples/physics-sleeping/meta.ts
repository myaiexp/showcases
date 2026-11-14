// playcanvas example: Sleeping bodies and activate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sleeping bodies and activate',
  summary:
    'A pile of crates settles and the physics engine puts each one to sleep, which the example shows by polling isActive() and dimming asleep crates. A ball dropped on the pile wakes the ones it touches, and the button calls activate() on every crate by hand.',
  section: 'Physics',
  tags: ['isActive', 'activate', 'teleport', 'rigidbody'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/physics/forces-and-impulses.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
