// galacean example: Spring joint: minDistance, maxDistance, tolerance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Spring joint: minDistance, maxDistance, tolerance",
  summary:
    "A weightless ball is tied to a point with minDistance 1.5 and maxDistance 3. Inside that band nothing acts on it; outside it (plus the tolerance) the joint pushes or pulls it back. The two circles are the limits, and the ball starts inside one round and outside the next.",
  section: "Physics",
  tags: ['SpringJoint.minDistance', 'SpringJoint.maxDistance', 'SpringJoint.tolerance'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/springJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
