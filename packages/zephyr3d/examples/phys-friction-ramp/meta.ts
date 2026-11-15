// zephyr3d example: Friction: sliding down a ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Friction: sliding down a ramp',
  summary:
    'Four boxes with Collider.friction from 0.05 to 1 start together on a tilted static ramp; a touching pair uses the average of its two frictions. The full view has a slider for the ramp\'s own friction.',
  section: 'Physics',
  tags: ['Collider', 'friction'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
