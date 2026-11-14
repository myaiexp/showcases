// playcanvas example: Forces and impulses against mass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Forces and impulses against mass',
  summary:
    'Four crates start in a row. The back two get applyForce every frame for 0.6 seconds, a push that lasts, and the front two get a single applyImpulse, an instant change of momentum. In each pair one crate weighs 1 kg and the other 4 kg, so the same force or impulse gives the heavy crate a quarter of the speed. Speeds are read back from linearVelocity.',
  section: 'Physics',
  tags: ['applyForce', 'applyImpulse', 'mass', 'linearVelocity', 'teleport'],
  docs: ['repo/docs/user-manual/physics/forces-and-impulses.md', 'repo/docs/user-manual/physics/rigid-bodies.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
