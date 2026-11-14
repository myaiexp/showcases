// playcanvas example: Applying a force or impulse at a point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Applying a force or impulse at a point',
  summary:
    'Three weightless bars, each turned 40 degrees about Y. One gets applyImpulse at a point given in the entity\'s local space, one gets applyForce for a moment with the same point turned into a world space offset with getWorldTransform().transformVector(), and one is pushed through its centre of mass. The first two spin identically; the third only translates. The point is a slider.',
  section: 'Physics',
  tags: ['applyImpulse', 'applyForce', 'getWorldTransform', 'transformVector', 'gravityScale', 'angularDamping'],
  docs: ['repo/docs/user-manual/physics/forces-and-impulses.md', 'repo/docs/user-manual/physics/rigid-bodies.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
