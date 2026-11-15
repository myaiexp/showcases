// zephyr3d example: Physics raycast: pick a body and push it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physics raycast: pick a body and push it',
  summary:
    'world.raycast returns the nearest collider along a ray with its body, node, point and distance. Hits on dynamic bodies get an impulse along the ray; the static pillar answers but cannot be pushed. Click in the full view.',
  section: 'Physics',
  tags: ['raycast', 'PhysicsQueryHit', 'applyImpulse', 'motionType'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
