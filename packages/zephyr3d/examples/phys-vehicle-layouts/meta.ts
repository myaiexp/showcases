// zephyr3d example: Vehicle layouts: drive and steer shares
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vehicle layouts: drive and steer shares',
  summary:
    'Wheel.drive and Wheel.steer are shares of the vehicle\'s engine force and steering angle: 0.5 on one pair is front or rear wheel drive, 0.25 on all four is four wheel drive, and a steer of -1 on the rear wheels steers against the front. Selects switch the layout while an autopilot circles the posts.',
  section: 'Physics',
  tags: ['Vehicle', 'Wheel', 'drive', 'steer', 'maxEngineForce', 'maxSteerAngle'],
  docs: ['repo/apps/doc/web/en/physics-vehicle.md', 'repo/apps/doc/src/tut-81/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
