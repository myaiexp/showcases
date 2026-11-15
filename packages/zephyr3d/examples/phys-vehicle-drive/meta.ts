// zephyr3d example: Vehicle: body, wheels and driving inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vehicle: body, wheels and driving inputs',
  summary:
    'A dynamic rigid body gets a Vehicle, and each wheel is a child node with a Wheel; the wheel nodes follow the suspension, steering and roll by themselves. W/S throttle and brake (reverse once stopped), A/D steer, space handbrake in the full view; an autopilot drives cards.',
  section: 'Physics',
  tags: ['Vehicle', 'Wheel', 'throttle', 'brake', 'steering', 'handbrake', 'speed'],
  docs: ['repo/apps/doc/web/en/physics-vehicle.md', 'repo/apps/doc/src/tut-81/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
