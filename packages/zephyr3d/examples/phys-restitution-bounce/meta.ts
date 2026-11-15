// zephyr3d example: Restitution: how much a ball bounces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Restitution: how much a ball bounces',
  summary:
    'Balls with Collider.restitution 0, 0.3, 0.6 and 0.9 drop onto one floor; a touching pair averages restitution, so the floor\'s value (a slider in the full view) shifts every bounce.',
  section: 'Physics',
  tags: ['Collider', 'restitution'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
