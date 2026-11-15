// zephyr3d example: Triggers: a zone that only detects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Triggers: a zone that only detects',
  summary:
    'A Collider with isTrigger set blocks nothing and raises triggerenter and triggerexit on the physics data of both nodes. Balls and boxes pass through a translucent zone and turn pink while inside it.',
  section: 'Physics',
  tags: ['Collider', 'isTrigger', 'triggerenter', 'triggerexit'],
  docs: ['repo/apps/doc/web/en/physics-colliders.md', 'repo/apps/doc/src/tut-77/main.js', 'repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
