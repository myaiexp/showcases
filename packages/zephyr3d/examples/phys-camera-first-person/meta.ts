// zephyr3d example: Camera collision: leaning in first person
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera collision: leaning in first person',
  summary:
    'The capsule already keeps a first person eye away from walls, but leaning out of it does not: the lean is swept from the head with shapeCast, so the eye stops at a wall instead of entering it. Q and E lean in the full view.',
  section: 'Physics',
  tags: ['shapeCast', 'exclude', 'layerMask', 'CharacterController'],
  docs: ['repo/apps/doc/web/en/physics-camera.md', 'repo/apps/doc/src/tut-82/main.js', 'repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
