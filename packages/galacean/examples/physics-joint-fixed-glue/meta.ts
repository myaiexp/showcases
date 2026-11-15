// galacean example: Fixed joint: gluing two bodies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed joint: gluing two bodies",
  summary:
    "Two pairs of crates rest on the floor and a ball is fired at the end of each. The left pair is glued by a FixedJoint whose connectedCollider is its neighbour, so it moves as one block; the right pair is loose and the far crate flies off alone.",
  section: "Physics",
  tags: ['FixedJoint', 'FixedJoint.connectedCollider', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/fixedJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
