// babylon-js example: Hinge, slider and 6DoF constraints with motors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hinge, slider and 6DoF constraints with motors',
  summary:
    'Three Physics6DoFConstraints built from per-axis limits: a door whose ANGULAR_Y is limited and driven by a velocity motor, a slider whose LINEAR_X follows a position motor, and a free-spinning turntable carrying cubes by friction.',
  section: 'Physics',
  tags: ['Physics6DoFConstraint', 'PhysicsConstraintAxis', 'PhysicsConstraintMotorType', 'setAxisMotorTarget', 'setAxisMotorMaxForce', 'limits'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/constraints.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
