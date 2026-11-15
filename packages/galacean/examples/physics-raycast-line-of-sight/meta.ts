// galacean example: Raycast: line of sight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: line of sight",
  summary:
    "A guard looks at a player circling behind a few walls. A ray from guard to player, limited to the distance between them and to the wall layer, says whether the view is blocked: green when clear, red with a dot where it stops.",
  section: "Physics",
  tags: ['PhysicsScene.raycast', 'Ray', 'Layer', 'Vector3.distance'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
