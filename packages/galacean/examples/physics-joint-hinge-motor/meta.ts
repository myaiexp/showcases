// galacean example: Hinge joint: motor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hinge joint: motor",
  summary:
    "A paddle wheel on a HingeJoint is driven by a JointMotor (targetVelocity 120 degrees per second) and scoops up the balls dropped on it. The full view has sliders for targetVelocity and forceLimit and a freeSpin switch.",
  section: "Physics",
  tags: ['HingeJoint.useMotor', 'HingeJoint.motor', 'JointMotor', 'JointMotor.targetVelocity', 'JointMotor.forceLimit'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
