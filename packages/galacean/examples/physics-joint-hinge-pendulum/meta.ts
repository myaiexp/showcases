// galacean example: Hinge joint: a free pendulum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hinge joint: a free pendulum",
  summary:
    "A bar hinged at its top end, with axis z and no limits, is released 60 degrees off vertical and swings for ever. The panel reads HingeJoint.angle and HingeJoint.velocity every frame.",
  section: "Physics",
  tags: ['HingeJoint.axis', 'HingeJoint.anchor', 'HingeJoint.angle', 'HingeJoint.velocity'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
