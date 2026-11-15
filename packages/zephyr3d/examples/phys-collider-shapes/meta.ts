// zephyr3d example: Collider shapes: box, sphere, capsule, cylinder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collider shapes: box, sphere, capsule, cylinder',
  summary:
    'Collider.shape picks the collision shape and size, radius or height say how big: box, sphere, capsule (height counts the round ends) and cylinder drop onto a floor and settle the way their shapes do.',
  section: 'Physics',
  tags: ['Collider', 'shape', 'radius', 'height', 'size'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
