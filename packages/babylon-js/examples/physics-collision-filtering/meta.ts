// babylon-js example: Collision filtering masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision filtering masks',
  summary:
    'Balls of three colours fall through three planks. Each ball shape has its own filterMembershipMask bit, each plank a filterCollideMask, so a plank stops only the colours in its mask. Selects in the full view rewrite the masks live.',
  section: 'Physics',
  tags: ['filterMembershipMask', 'filterCollideMask', 'PhysicsShape', 'bitmask'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/collisionEvents.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
