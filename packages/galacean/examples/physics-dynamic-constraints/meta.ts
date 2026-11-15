// galacean example: Dynamic collider: constraints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: constraints",
  summary:
    "The same ball hits four identical crates, each with different DynamicColliderConstraints: none, FreezePositionY, all FreezeRotation and FreezePositionX plus Z. They tip, slide flat, slide upright or stay put.",
  section: "Physics",
  tags: ['DynamicCollider.constraints', 'DynamicColliderConstraints'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
