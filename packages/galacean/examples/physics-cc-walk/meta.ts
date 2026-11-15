// galacean example: Character controller: walk, gravity and jump
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: walk, gravity and jump",
  summary:
    "The docs' CharacterMovement script: a capsule CharacterController with hand-written gravity, WASD and Space in the full view. move() returns collision flags, and Down is what says the character is on the ground. The card walks a circle on its own.",
  section: "Physics",
  tags: ['CharacterController', 'CharacterController.move', 'ControllerCollisionFlag', 'CapsuleColliderShape'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
