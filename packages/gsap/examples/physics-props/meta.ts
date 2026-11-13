// gsap example: physicsProps with velocity, acceleration and friction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PhysicsProps velocity and friction',
  summary:
    'Four balls move with PhysicsPropsPlugin: constant velocity, velocity plus acceleration, velocity with friction, and an arc from x and y physics. The timeline yoyos, so the balls retrace their steps backward.',
  section: 'Physics',
  tags: ['physicsProps', 'velocity', 'acceleration', 'friction', 'reverse'],
  docs: ['pages/gsap-com/docs/v3/Plugins/PhysicsPropsPlugin.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
