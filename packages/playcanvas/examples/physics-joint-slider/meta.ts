// playcanvas example: Slider joints with motors and limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Slider joints with motors and limits',
  summary:
    'Two slider joints with no second body. A block runs back and forth along the frame\'s X axis and a lift is raised by turning the joint entity so X points up. Each has enableLimits with limits measured from the start pose, plus a motor: motorSpeed in units per second and maxMotorForce above zero to engage it. A motor with limits stalls against the stop, and with the force at zero the lift just sinks under its weight.',
  section: 'Physics',
  tags: ['joint', 'JOINTTYPE_SLIDER', 'motorSpeed', 'maxMotorForce', 'enableLimits', 'limits'],
  docs: ['repo/docs/user-manual/physics/joints.md', 'repo/docs/user-manual/editor/scenes/components/joint.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
