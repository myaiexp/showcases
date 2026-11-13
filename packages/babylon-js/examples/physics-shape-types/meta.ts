// babylon-js example: Physics shape types side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physics shape types side by side',
  summary:
    'Each shape class from the shapes chapter, built in local space and attached to a dynamic body: PhysicsShapeSphere, Cylinder, Capsule, Box, ConvexHull and Container, plus a static PhysicsShapeMesh ring that a ball falls through because mesh shapes stay concave.',
  section: 'Physics',
  tags: ['PhysicsShapeSphere', 'PhysicsShapeCylinder', 'PhysicsShapeCapsule', 'PhysicsShapeBox', 'PhysicsShapeConvexHull', 'PhysicsShapeMesh', 'PhysicsShapeContainer', 'PhysicsBody'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/shapes.md',
    'repo/content/features/featuresDeepDive/physics/v2/rigidBodies.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
