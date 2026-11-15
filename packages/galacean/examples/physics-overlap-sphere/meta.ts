// galacean example: Overlap: overlapSphereAll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overlap: overlapSphereAll",
  summary:
    "A sphere swells and shrinks as it drifts over a field of crates; overlapSphereAll(center, radius, layerMask, shapes) lists the shapes it touches, and they light up. The full view has a radius slider and a Layer1 filter.",
  section: "Physics",
  tags: ['PhysicsScene.overlapSphereAll', 'ColliderShape.collider', 'Layer'],
  docs: [
    'repo/docs/en/physics/query/overlap.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
