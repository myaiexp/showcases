// galacean example: Dynamic collider: maxDepenetrationVelocity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: maxDepenetrationVelocity",
  summary:
    "Three crates are created half-buried in the floor. With the default maxDepenetrationVelocity (1e32) one pops out explosively; capped at 4 or 1 unit per second the others ooze out gently.",
  section: "Physics",
  tags: ['DynamicCollider.maxDepenetrationVelocity', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
