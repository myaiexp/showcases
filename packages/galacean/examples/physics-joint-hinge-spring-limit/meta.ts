// galacean example: Hinge joint: hard limit versus spring limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hinge joint: hard limit versus spring limit",
  summary:
    "Two bars hinged at one end fall to their 45-degree limit. The left limit is hard and stops them abruptly; the right has useSpring on with stiffness and damping, so it gives and rebounds. Full view: sliders for stiffness and damping.",
  section: "Physics",
  tags: ['HingeJoint.useSpring', 'JointLimits.stiffness', 'JointLimits.damping', 'JointLimits.contactDistance'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
