// zephyr3d example: Forces in the fixed step: wind on a wall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Forces in the fixed step: wind on a wall',
  summary:
    'world.on(\'fixedupdate\') applies a sustained force to every crate before each simulation step, so the push is the same at any frame rate. Sliders set the wind and switch it off.',
  section: 'Physics',
  tags: ['applyForce', 'fixedupdate', 'RigidBody', 'wakeUp'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
