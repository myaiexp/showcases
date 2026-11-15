// zephyr3d example: raycastAll and includeTriggers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'raycastAll and includeTriggers',
  summary:
    'world.raycastAll lists every collider along a ray, nearest first. A trigger pillar in the row is skipped unless includeTriggers is set; markers and the readout number the hits.',
  section: 'Physics',
  tags: ['raycastAll', 'includeTriggers', 'PhysicsQueryOptions'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js', 'repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
