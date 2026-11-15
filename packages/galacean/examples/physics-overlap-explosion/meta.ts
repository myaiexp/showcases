// galacean example: Overlap: an explosion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overlap: an explosion",
  summary:
    "Every few seconds a blast goes off in a heap of crates: overlapSphereAll finds the dynamic bodies inside the blast radius and each one gets a single applyForce away from the centre, weaker with distance. Press the canvas in the full view to set one off there.",
  section: "Physics",
  tags: ['PhysicsScene.overlapSphereAll', 'DynamicCollider.applyForce', 'Layer'],
  docs: [
    'repo/docs/en/physics/query/overlap.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
