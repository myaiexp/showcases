// zephyr3d example: Camera collision: a spring arm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera collision: a spring arm',
  summary:
    'A third person camera hangs on an arm behind the character; a sphere swept along the arm with shapeCast (excluding the character, skipping a props layer) pulls the camera in to where it stops. Turn the collision test off to see it go through the walls.',
  section: 'Physics',
  tags: ['shapeCast', 'exclude', 'layerMask', 'distance', 'CharacterController'],
  docs: ['repo/apps/doc/web/en/physics-camera.md', 'repo/apps/doc/src/tut-82/main.js', 'repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
