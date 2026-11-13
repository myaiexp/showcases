// babylon-js example: Physics raycast with a hit marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physics raycast with a hit marker',
  summary:
    'A ray sweeps round a ring of static boxes and spheres through physicsEngine.raycastToRef with one reused PhysicsRaycastResult; a marker and a normal line sit on the hit, and a collideWith mask limits the ray to boxes or spheres. Pointer aiming is in the full view.',
  section: 'Physics',
  tags: ['raycastToRef', 'PhysicsRaycastResult', 'collideWith', 'filterMembershipMask', 'hitNormalWorld'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/raycast.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
