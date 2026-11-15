// galacean example: Dynamic collider: applyTorque pulses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: applyTorque pulses",
  summary:
    "A floating flywheel gets a torque on every physics step for one second, then none for a second. Its angularVelocity climbs while torque is applied and decays through angularDamping when it stops. Hold the button in the full view.",
  section: "Physics",
  tags: ['DynamicCollider.applyTorque', 'DynamicCollider.angularVelocity', 'DynamicCollider.angularDamping'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
