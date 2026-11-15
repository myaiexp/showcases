// galacean example: Dynamic collider: linearVelocity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: linearVelocity",
  summary:
    "Balls launched by writing linearVelocity from the same spot with five different speeds fly five different arcs; the panel reads the velocity back from the last ball as gravity changes it.",
  section: "Physics",
  tags: ['DynamicCollider.linearVelocity', 'Vector3'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
