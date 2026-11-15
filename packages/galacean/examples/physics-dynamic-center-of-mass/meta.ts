// galacean example: Dynamic collider: centerOfMass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: centerOfMass",
  summary:
    "Two identical balls are released tilted. The left one has an automatic centre of mass and stays put; the right one has automaticCenterOfMass off and centerOfMass low, so it rocks like a roly-poly until the red weight sits at the bottom.",
  section: "Physics",
  tags: ['DynamicCollider.centerOfMass', 'DynamicCollider.automaticCenterOfMass', 'DynamicCollider.angularDamping'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
