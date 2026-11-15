// galacean example: Gravity as a vector: a turning box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gravity as a vector: a turning box",
  summary:
    "Sixteen balls in a glass-walled box while the gravity vector turns around the z axis, so they roll round the walls. Only physics.gravity changes; the arrow shows the vector.",
  section: "Physics",
  tags: ['scene.physics.gravity', 'Vector3', 'StaticCollider'],
  docs: [
    'repo/docs/en/physics/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
