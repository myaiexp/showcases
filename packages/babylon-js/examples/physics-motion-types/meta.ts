// babylon-js example: Motion types, sleep and mass properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion types, sleep and mass properties',
  summary:
    'The three PhysicsMotionType values side by side: a STATIC ledge, an ANIMATED lift moved with setLinearVelocity that carries a dynamic crate, and DYNAMIC bodies. A stack created with startsAsleep wakes on impact, and setMassProperties moves a sphere’s centerOfMass so it rights itself.',
  section: 'Physics',
  tags: ['PhysicsMotionType', 'PhysicsBody', 'setMassProperties', 'centerOfMass', 'setLinearVelocity', 'sleep mode'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/rigidBodies.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
