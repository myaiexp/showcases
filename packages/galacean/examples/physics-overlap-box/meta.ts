// galacean example: Overlap: overlapBoxAll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overlap: overlapBoxAll",
  summary:
    "A turning box roams over a field of crates and overlapBoxAll(center, halfExtents, orientation, layerMask, shapes) returns every shape inside it, which light up. The result array is reused each frame; the full view can limit the query to Layer1.",
  section: "Physics",
  tags: ['PhysicsScene.overlapBoxAll', 'ColliderShape', 'Quaternion'],
  docs: [
    'repo/docs/en/physics/query/overlap.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
