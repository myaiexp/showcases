// galacean example: Spring joints as a rope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spring joints as a rope",
  summary:
    "A rope of seven balls: each has a SpringJoint whose connectedCollider is the ball before it, with maxDistance as the link length, and the first is pinned to a world point. A kick sends it swinging.",
  section: "Physics",
  tags: ['SpringJoint.connectedCollider', 'SpringJoint.connectedAnchor', 'SpringJoint.automaticConnectedAnchor'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/springJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
