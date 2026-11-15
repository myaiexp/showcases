// galacean example: Hinge joint: a door with angle limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hinge joint: a door with angle limits",
  summary:
    "A door hinged to a post about the Y axis with useLimits and limits of -70 to 70 degrees. Balls thrown at it swing it open until the limit stops it; the panel reads HingeJoint.angle. Full view: sliders for both limits.",
  section: "Physics",
  tags: ['HingeJoint.useLimits', 'HingeJoint.limits', 'JointLimits', 'HingeJoint.angle', 'HingeJoint.axis'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
