// zephyr3d example: Character controller: move in the fixed step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Character controller: move in the fixed step',
  summary:
    'A CharacterController in node.physics.character brings its own capsule. Each fixed step the game keeps vertical speed itself (gravity, jump) and calls move(displacement), which slides along walls, climbs steps and stays on the ground. WASD and space in the full view; an autopilot in cards.',
  section: 'Physics',
  tags: ['CharacterController', 'move', 'isGrounded', 'fixedupdate', 'NodePhysics'],
  docs: ['repo/apps/doc/web/en/physics-character.md', 'repo/apps/doc/src/tut-80/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
