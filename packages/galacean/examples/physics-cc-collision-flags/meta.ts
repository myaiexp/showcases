// galacean example: Character controller: collision flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Character controller: collision flags",
  summary:
    "A character paces a low tunnel and jumps in it. Each move() call returns flags: Down when standing on the floor, Sides at a wall and Up when it bumps its head. Three lamps light up from the returned value.",
  section: "Physics",
  tags: ['ControllerCollisionFlag', 'CharacterController.move', 'CharacterController.stepOffset'],
  docs: [
    'repo/docs/en/physics/collider/characterController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
