// babylon-js example: Chain and pendulum constraints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chain and pendulum constraints',
  summary:
    'A chain of overlapping links joined by BallAndSocketConstraint with mass falling towards the tip, and three pendulums on DistanceConstraint ropes of different lengths, each added with body.addConstraint.',
  section: 'Physics',
  tags: ['BallAndSocketConstraint', 'DistanceConstraint', 'addConstraint', 'PhysicsBody', 'mass ratio'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/constraints.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
