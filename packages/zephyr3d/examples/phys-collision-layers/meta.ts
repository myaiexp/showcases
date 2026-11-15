// zephyr3d example: Collision layers and setLayerCollision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision layers and setLayerCollision',
  summary:
    'Collider.layer puts boxes on layer 1 or 2, and world.setLayerCollision(1, 2, false) makes the two layers pass through each other. Yellow ghosts land on blue rocks or fall straight through them.',
  section: 'Physics',
  tags: ['Collider', 'layer', 'setLayerCollision', 'physicsWorld'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
