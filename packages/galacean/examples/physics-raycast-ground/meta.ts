// galacean example: Raycast: ground detection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: ground detection",
  summary:
    "A hovering ball glides over a staircase of boxes. Each frame a ray from above, limited to Layer1, finds the ground height under it, and the ball keeps 0.7 above that height, the docs' ground-detection recipe.",
  section: "Physics",
  tags: ['PhysicsScene.raycast', 'HitResult.point', 'Layer'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
