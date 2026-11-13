// babylon-js example: Physics debug viewer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physics debug viewer',
  summary:
    'PhysicsViewer (BABYLON.Debug.PhysicsViewer) overlays every body’s shape (sphere, capsule, cylinder, boxes, ground) on translucent render meshes, and showConstraint draws the limits of a hinge. A checkbox calls hideBody and hideConstraint to switch it off again.',
  section: 'Physics',
  tags: ['PhysicsViewer', 'showBody', 'hideBody', 'showConstraint', 'HingeConstraint'],
  docs: [
    'repo/content/features/featuresDeepDive/physics/v2/usingPhysicsEngine.md',
    'repo/content/features/featuresDeepDive/physics/v2/constraints.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
