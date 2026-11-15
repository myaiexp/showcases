// galacean example: Fixed joint: pinned to a point in space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed joint: pinned to a point in space",
  summary:
    "A crate with a FixedJoint and no connectedCollider is welded to the world where it is created: it hangs in mid-air and shrugs off the balls that hit it, while an identical crate beside it just falls.",
  section: "Physics",
  tags: ['FixedJoint', 'FixedJoint.anchor', 'FixedJoint.automaticConnectedAnchor', 'FixedJoint.connectedAnchor'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/fixedJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
