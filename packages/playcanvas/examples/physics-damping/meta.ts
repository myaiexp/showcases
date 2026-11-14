// playcanvas example: Linear and angular damping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linear and angular damping',
  summary:
    'Gravity-free spheres are launched with the same linearVelocity but linearDamping 0, 0.2, 0.5 and 0.8, so they lose speed like air resistance and stop at different distances. Beside them, boxes pinned in place spin from the same angularVelocity with angularDamping 0, 0.2, 0.5 and 0.8 and wind down at different rates.',
  section: 'Physics',
  tags: ['linearDamping', 'angularDamping', 'linearVelocity', 'angularVelocity', 'gravityScale', 'linearFactor'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/physics/forces-and-impulses.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
