// galacean example: Hinge joint: breakTorque
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hinge joint: breakTorque",
  summary:
    "Two doors swing on hinges, one with breakTorque Infinity and one with 40. A heavy ball dropped on each free end twists the hinge sideways: the strong one survives and the weak one is torn off its post.",
  section: "Physics",
  tags: ['Joint.breakTorque', 'HingeJoint', 'Joint.breakForce'],
  docs: [
    'repo/docs/en/physics/joint/overview.mdx',
    'repo/docs/en/physics/joint/hingeJoint.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
