// galacean example: Shape cast: capsuleCast as a movement check
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape cast: capsuleCast as a movement check",
  summary:
    "A character-sized capsule asks capsuleCast how far it can step before hitting something, then walks exactly that far: the moves stop short of each crate by the hit distance, as in the docs' character pre-check.",
  section: "Physics",
  tags: ['PhysicsScene.capsuleCast', 'HitResult.distance', 'Quaternion'],
  docs: [
    'repo/docs/en/physics/query/sweep.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
