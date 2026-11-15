// zephyr3d example: Rigid bodies: colliders, a ramp and falling boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rigid bodies: colliders, a ramp and falling boxes',
  summary:
    'initPhysics(rapierPhysics) loads the Rapier engine. A node with only a Collider is static (the ground, a tilted ramp); adding a RigidBody makes it dynamic. Boxes and bouncy balls (restitution 0.5, mass 2) drop onto the ramp; removing a node takes it out of the simulation.',
  section: 'Physics',
  tags: ['initPhysics', 'rapierPhysics', 'NodePhysics', 'RigidBody', 'Collider', 'restitution'],
  docs: ['repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
