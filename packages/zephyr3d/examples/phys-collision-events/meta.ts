// zephyr3d example: Collision events: enter, stay and exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision events: enter, stay and exit',
  summary:
    'Bouncing balls raise collisionenter, collisionstay and collisionexit on their physics data: the counts, the last impact\'s impulse and the ball\'s colour (orange while touching) follow the events.',
  section: 'Physics',
  tags: ['collisionenter', 'collisionstay', 'collisionexit', 'NodePhysics', 'impulse'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
