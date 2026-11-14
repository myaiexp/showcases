// playcanvas example: Torque and torque impulses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Torque and torque impulses',
  summary:
    'Two weightless propellers pinned in place. One is driven by applyTorque every frame and keeps spinning up for as long as it is applied; the other gets a single applyTorqueImpulse and then slowly winds down through its angular damping. The world axis the torque turns about is a select, and the angular velocity is read back live.',
  section: 'Physics',
  tags: ['applyTorque', 'applyTorqueImpulse', 'angularVelocity', 'angularDamping', 'linearFactor'],
  docs: ['repo/docs/user-manual/physics/forces-and-impulses.md', 'repo/docs/user-manual/physics/rigid-bodies.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
