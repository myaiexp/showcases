// playcanvas example: 6DoF joint springs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '6DoF joint springs',
  summary:
    'A 6dof joint starts with every axis locked, so only the axes you open can move. Three crates hang from the world with linearMotionY set to free and a linearStiffness on Y, which turns that axis into a spring pulling to its equilibrium, with linearDamping taking the energy out; the soft one sags and bobs, the stiff one barely moves. Two paddles do the same about Z with angularMotionZ and angularStiffness.',
  section: 'Physics',
  tags: ['joint', 'JOINTTYPE_6DOF', 'MOTION_FREE', 'linearMotionY', 'linearStiffness', 'linearDamping', 'angularMotionZ', 'angularStiffness', 'angularDamping'],
  docs: ['repo/docs/user-manual/physics/joints.md', 'repo/docs/user-manual/editor/scenes/components/joint.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
