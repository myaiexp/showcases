// galacean example: Shape cast: sphereCast
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape cast: sphereCast",
  summary:
    "A ball of radius 0.6 is cast along a direction that sweeps through a field of crates, using sphereCast(center, radius, direction, distance, layerMask, hit). The amber wire is where the ball would be when it first touches a crate.",
  section: "Physics",
  tags: ['PhysicsScene.sphereCast', 'HitResult'],
  docs: [
    'repo/docs/en/physics/query/sweep.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
